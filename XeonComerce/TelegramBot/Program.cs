using AppCore;
using Entities;
using Management;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Bot;
using Telegram.Bot.Args;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.ReplyMarkups;

namespace TelegramBot
{
    class Program
    {
        private static ITelegramBotClient botClient;
        private static readonly UsuarioTelegramManagement usuarioTelegramManagement = new UsuarioTelegramManagement();
        private static readonly ComercioManagement comercioManagement = new ComercioManagement();
        private static readonly SucursalManagement sucursalManagement = new SucursalManagement();
        private static readonly DireccionManagement direccionManagement = new DireccionManagement();
        private static readonly UsuarioManagement usuarioManagement = new UsuarioManagement();
        private static readonly ProductoServicioManagement productoServicioManagement = new ProductoServicioManagement();

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
            await botClient.SendChatActionAsync(query.Message.Chat.Id, ChatAction.Typing);
            await Task.Delay(50);
            switch (query.Data.Split("_")[0])
            {
                case "login":
                    await botClient.SendTextMessageAsync(
                        chatId: query.Message.Chat,
                        text: "¡Envíame tu número de cédula, para asociar tu cuenta!\n" +
                        "Usa el siguiente formato: usuario_12345678",
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
                case "comercio":
                    var listadoSucursales = ListarSucursales(query.Data.Split("_")[1]);
                    Comercio comercio = ObtenerComercio(query.Data.Split("_")[1]);
                    SendVenue(query.Message, comercioManagement.RetrieveById(comercio));
                    await Task.Delay(50);
                    await botClient.SendTextMessageAsync(
                        chatId: query.Message.Chat,
                        text: "Estas son las sucursales de " + comercio.NombreComercial,
                        replyMarkup: listadoSucursales
                        );
                    break;
                case "sucursal":
                    string idSucursal = query.Data.Split("_")[1];
                    var sucursal = ObtenerSucursal(idSucursal);
                    SendVenue(query.Message, sucursalManagement.RetriveById(sucursal));
                    if (IsLoggedInChat(query.Message))
                    {
                        await botClient.SendTextMessageAsync(
                            chatId: query.Message.Chat,
                            text: "¿Desea reservar una cita?",
                            replyMarkup: new InlineKeyboardMarkup(new[]
                            {
                                new[]
                                {
                                    InlineKeyboardButton.WithCallbackData("Servicio","servicio_"+idSucursal),
                                    InlineKeyboardButton.WithCallbackData("Producto","producto_"+idSucursal)
                                }
                            })
                            );
                    }
                    else
                    {
                        SendText(query.Message, "¡Inicia sesión para agendar una cita!");
                    }
                    break;
                case "servicio":
                    var listaServicios = ListarServicios(query.Data.Split("_")[1]);
                    await botClient.SendTextMessageAsync(
                        chatId: query.Message.Chat,
                        text: "Por favor, seleccione el producto para el que desea sacar cita:",
                        replyMarkup: listaServicios
                        );
                    break;
                case "producto":
                    var listaProductos = ListarProductos(query.Data.Split("_")[1]);
                    await botClient.SendTextMessageAsync(
                        chatId: query.Message.Chat,
                        text: "Por favor, seleccione el producto para el que desea sacar cita:",
                        replyMarkup: listaProductos
                        );
                    break;
                case "citaproducto":
                    break;
            }
        }

        private static InlineKeyboardMarkup ListarProductos(string idSucursal)
        {
            List<Producto> listaProductos = productoServicioManagement.RetrieveAllProductos();
            List<Producto> productosComercio = new List<Producto>();
            foreach (var producto in listaProductos)
            {
                if (producto.IdComercio == idSucursal.Split("-")[0])
                    productosComercio.Add(producto);
            }

            var btns = new InlineKeyboardButton[productosComercio.Count()][];
            int count = 0;
            foreach (var row in productosComercio)
            {
                btns[count] = new[]
                {
                    InlineKeyboardButton.WithCallbackData(row.Nombre, "citaproducto_"+row.Id+"_"+idSucursal)
                };
                count++;
            }
            return btns;
        }

        private static InlineKeyboardMarkup ListarServicios(string idSucursal)
        {
            List<Servicio> listaServicios = productoServicioManagement.RetrieveAllServicios();
            List<Servicio> serviciosComercio = new List<Servicio>();
            foreach (var servicio in listaServicios)
            {
                if (servicio.IdComercio == idSucursal.Split("-")[0])
                    serviciosComercio.Add(servicio);
            }

            var btns = new InlineKeyboardButton[serviciosComercio.Count()][];
            int count = 0;
            foreach (var row in serviciosComercio)
            {
                btns[count] = new[]
                {
                    InlineKeyboardButton.WithCallbackData(row.Nombre, "citaservicio_"+row.Id+"_"+idSucursal)
                };
                count++;
            }
            return btns;

        }

        private static Sucursal ObtenerSucursal(string idSucursal)
        {
            return sucursalManagement.RetriveById(
                new Sucursal()
                {
                    Id = idSucursal
                });
        }

        private static Comercio ObtenerComercio(string idComercio)
        {
            return comercioManagement.RetrieveById(
                new Comercio()
                {
                    CedJuridica = idComercio
                }) ;
        }

        private static InlineKeyboardMarkup ListarSucursales(string comercioId)
        {
            List<Sucursal> listaSucursales = sucursalManagement.RetriveAll();
            List<Sucursal> sucursalesComercio = new List<Sucursal>();
            foreach (var sucursal in listaSucursales)
            {
                if (sucursal.IdComercio == comercioId)
                    sucursalesComercio.Add(sucursal);
            }

            var btns = new InlineKeyboardButton[sucursalesComercio.Count()][];

            int counter=0;
            foreach (var sucursal in sucursalesComercio)
            {
                btns[counter] = new[]
                {
                    InlineKeyboardButton.WithCallbackData(sucursal.Nombre, "sucursal_"+sucursal.Id)
                };

                counter++;
            }

            return new InlineKeyboardMarkup(btns);
        }

        static async void BotOnMessageAsync(object sender, MessageEventArgs msgArgs)
        {
            var mensaje = msgArgs.Message;
            if (mensaje == null) return;
            Console.WriteLine($"Received a message from {msgArgs.Message.Chat.Id} that says {mensaje.Text}");
            switch (mensaje.Text.Split("_")[0])
            {
                case "usuario":
                    if (!IsLoggedInChat(mensaje) && !IsLoggedIn(mensaje.Text.Split("_")[1]))
                    {
                        IniciarSesion(mensaje);
                    }
                    else
                    {
                        SendText(mensaje, "Ya iniciaste sesión.");
                    }
                    break;
                default:
                    if (!IsLoggedInChat(mensaje))
                    {
                        SendText(mensaje, "Este es el menú");
                        var menuPrincipal = new InlineKeyboardMarkup(new[]
                        {
                            new[]
                            {
                                InlineKeyboardButton.WithCallbackData(
                                    text:"Iniciar Sesión",
                                    callbackData: "login_"),
                                InlineKeyboardButton.WithCallbackData(
                                    text: "Comercios",
                                    callbackData: "listar-comercios_")
                            }
                        });
                        await botClient.SendTextMessageAsync(
                            chatId: mensaje.Chat,
                            text: "Seleccione una opción...",
                            replyMarkup: menuPrincipal
                            );
                    }
                    else
                    {
                        var listadoComercios = ListarComercios();
                        await botClient.SendTextMessageAsync(
                            chatId: mensaje.Chat,
                            text: "¡Selecciona un comercio!",
                            replyMarkup: listadoComercios
                            );
                    }
                    break;
            }
        }
        
        private static bool IsLoggedInChat(Message mensaje)
        {
            List<UsuarioTelegram> usuarios = usuarioTelegramManagement.RetrieveAll();
            foreach (UsuarioTelegram user in usuarios)
            {
                if (user.IdChat == mensaje.Chat.Id.ToString())
                {
                    return true;
                }
            }
            return false;
        }

        private static void IniciarSesion(Message mensaje)
        {
            Usuario user = usuarioManagement.RetrieveById(new Usuario() { Id = mensaje.Text.Split("_")[1] });
            if (user != null)
            {
                usuarioTelegramManagement.Create(
                    new UsuarioTelegram()
                    {
                        IdChat = mensaje.Chat.Id.ToString(),
                        IdUsuario = mensaje.Text
                    });
                SendText(mensaje, "¡Sesión iniciada!");
            }
            else
            {
                SendText(mensaje, "Lo siento, pero no sé de ningún usuario registrado con esa cédula.");
            }
        }

        //private static bool IsCedula(string text)
        //{
        //    return text.Length == 9 && int.TryParse(text, out _);
        //}

        public static InlineKeyboardMarkup ListarComercios()
        {
            List<Comercio> comercios = comercioManagement.RetrieveAll();
            var btns = new InlineKeyboardButton[comercios.Count()][];
            int counter = 0;
            foreach(var comercio in comercios)
            {
                var row = new[]
                {
                    InlineKeyboardButton.WithCallbackData(comercio.NombreComercial, "comercio_"+comercio.CedJuridica)
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

        private static async void SendVenue(Message e, BaseEntity entity)
        {
            string nombre = "nulo";
            Direccion dir = new Direccion() { Latitud = "9.7489", Longitud= "-83.7534", Sennas = "Señas" };
            switch (entity.GetType().ToString().Split(".")[1])
            {
                default:
                    SendText(e, entity.GetType().ToString());
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
                chatId: e.Chat,
                latitude: lat,
                longitude: lng,
                title: nombre,
                address: dir.Sennas
                );
        }
    }
}
