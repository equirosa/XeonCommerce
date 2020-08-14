using AppCore;
using Entities;
using Management;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Telegram.Bot;
using Telegram.Bot.Args;
using Telegram.Bot.Types;
using Telegram.Bot.Types.ReplyMarkups;

namespace TelegramBot
{
    class Program
    {
        private static ITelegramBotClient botClient;
        private static UsuarioTelegramManagement usuarioTelegramManagement = new UsuarioTelegramManagement();
        private static ComercioManagement comercioManagement = new ComercioManagement();
        private static SucursalManagement sucursalManagement = new SucursalManagement();
        private static DireccionManagement direccionManagement = new DireccionManagement();

        static void Main()
        {
            botClient = new TelegramBotClient("1117317312:AAFBPk8r2P9B1EO5oLQ6bgesfxRE8iojefk");

            var me = botClient.GetMeAsync().Result;
            Console.WriteLine(
              $"Hello, World! I am user {me.Id} and my name is {me.FirstName}."
            );

            botClient.OnMessage += BotOnMessageAsync;
            botClient.OnCallbackQuery += BotOnCallbackQuery;
            botClient.OnReceiveError += BotOnReceiveError;
            botClient.StartReceiving();

            Console.WriteLine("Press any key to exit");
            Console.ReadKey();

            botClient.StopReceiving();
        }

        private static void BotOnReceiveError(object sender, ReceiveErrorEventArgs errorArgs)
        {
            Console.WriteLine("Received error: {0} — {1}",
                errorArgs.ApiRequestException.ErrorCode,
                errorArgs.ApiRequestException.Message);
        }
        private static async void BotOnCallbackQuery(object sender, CallbackQueryEventArgs queryArgs)
        {
            var query = queryArgs.CallbackQuery;
            Console.WriteLine($"Got callback, contains {query.Data}");
            switch (query.Data)
            {
                case "login":
                    await botClient.SendTextMessageAsync(
                        chatId: query.Message.Chat,
                        text: "¡Envíame tu número de cédula, con ceros y sin guiones ni espacios, para asociar tu cuenta!",
                        replyMarkup: new ForceReplyMarkup()
                        );
                    break;
                case "listar-comercios":
                    var listadoComercios = ListarComercios();
                    await botClient.SendTextMessageAsync(
                        chatId: query.Message.Chat,
                        text: "¡Aquí están los comercios!",
                        replyMarkup: listadoComercios
                        );
                    break;
            }
        }

        static async void BotOnMessageAsync(object sender, MessageEventArgs msgArgs)
        {
            var mensaje = msgArgs.Message;
            if (mensaje == null) return;
            Console.WriteLine($"Received a message from {msgArgs.Message.Chat.Id} that says {mensaje.Text}");
               switch (mensaje.Text)
               {
                    default:
                    case "/menu":
                    if (IsCedula(mensaje.Text) && !IsLoggedIn(mensaje.Text))
                    {
                        IniciarSesion(mensaje);
                    }
                    else
                    {
                        if (IsCedula(mensaje.Text) && IsLoggedIn(mensaje.Text)){
                            SendText(mensaje, "Ya iniciaste sesión.");
                        }
                        else {
                            SendText(mensaje, "Este es el menú");
                            var menuPrincipal = new InlineKeyboardMarkup(new[]
                            {
                                new[]
                                {
                                    InlineKeyboardButton.WithCallbackData(
                                        text:"Iniciar Sesión",
                                        callbackData: "login"),
                                    InlineKeyboardButton.WithCallbackData(
                                        text: "Comercios",
                                        callbackData: "listar-comercios")
                                }
                            });

                            await botClient.SendTextMessageAsync(
                                    chatId: mensaje.Chat,
                                    text: "Seleccione una opción...",
                                    replyMarkup: menuPrincipal
                                    );
                        }
                    }
                    break;
               }
        }

        private static void IniciarSesion(Message mensaje)
        {
            usuarioTelegramManagement.Create(
                new UsuarioTelegram()
                {
                    IdChat = mensaje.Chat.Id.ToString(),
                    IdUsuario = mensaje.Text
                });
            SendText(mensaje, "¡Sesión iniciada!");
        }

        private static bool IsCedula(string text)
        {
            return text.Length == 9 && int.TryParse(text, out _);
        }

        private static void ManejarCedula(MessageEventArgs e)
        {
            string cedula = e.Message.Text.Split("/")[1];
            string msg = "No se encontraron resultados para esa cédula...";
            if (cedula.StartsWith("3") && cedula.Length > 1)
            {
                SendVenue(e,comercioManagement.RetrieveById(new Comercio() { CedJuridica = cedula })); ;
                msg = "Lista de sucursales del comercio:\n" +
                    "-------------------------\n";
                List<Sucursal> sucursales = sucursalManagement.RetriveAll();
                foreach (var c in sucursales)
                {
                    if (c.IdComercio == cedula)
                    {
                        msg += c.Nombre + " - /" + c.Id + "\n";
                    }
                }
                msg += "------------------------\n";
            }
            SendText(e.Message, msg);
        }

        public static InlineKeyboardMarkup ListarComercios()
        {
            List<Comercio> comercios = comercioManagement.RetrieveAll();
            var btns = new InlineKeyboardButton[comercios.Count()][];
            int counter = 0;
            foreach(var comercio in comercios)
            {
                var row = new[]
                {
                    InlineKeyboardButton.WithCallbackData(comercio.NombreComercial, "comercio"+comercio.CedJuridica)
                };
                btns[counter] = row;
                counter++;
            }
            return new InlineKeyboardMarkup(btns);
        }

        public static bool IsLoggedIn(string id)
        {
            List<UsuarioTelegram> usuarios = usuarioTelegramManagement.RetrieveAll();
            foreach (UsuarioTelegram user in usuarios)
            {
                Console.WriteLine(id);
                if (user.IdUsuario == id)
                {
                    Console.WriteLine($"User is logged in");
                    return true;
                }
            }
            return false;
        }

        private static async void SendText(Message e, string mensaje)
        {
            await botClient.SendTextMessageAsync(
                chatId: e.Chat,
                text: mensaje
                );
        }

        private static async void SendVenue(MessageEventArgs e, BaseEntity entity)
        {
            string nombre = "nulo";
            Direccion dir = new Direccion() { Latitud = "9.7489", Longitud= "-83.7534", Sennas = "Señas" };
            switch (entity.GetType().ToString().Split(".")[1])
            {
                default:
                    SendText(e.Message, entity.GetType().ToString());
                    break;
                case "Comercio":
                    var comercio = (Comercio)entity;
                    nombre = comercio.NombreComercial;
                    dir = direccionManagement.RetriveById(new Direccion() { Id = comercio.Direccion });
                    break;
                case "Sucursal":
                    var sucursal = (Sucursal)entity;
                    nombre = sucursal.Nombre;
                    dir = direccionManagement.RetriveById(new Direccion() { Id = sucursal.IdDireccion });
                    break;
            }
            float.TryParse(dir.Latitud, out float lat);
            float.TryParse(dir.Longitud, out float lng);
            await botClient.SendVenueAsync(
                chatId: e.Message.Chat,
                latitude: lat,
                longitude: lng,
                title: nombre,
                address: dir.Sennas
                );
        }
    }
}
