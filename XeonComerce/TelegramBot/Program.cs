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
using SendGrid;
using SendGrid.Helpers.Mail;

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
        private static readonly CitaManagement citaManagement = new CitaManagement();
        private static readonly Random random = new Random();
        private static Dictionary<string, CitaProducto> citasEnProceso = new Dictionary<string, CitaProducto>();
        private static Dictionary<string, Usuario> clientesIniciandoSesión = new Dictionary<string, Usuario>();

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

        private static void BotOnInlineQuery(object sender, InlineQueryEventArgs args)
        {
            throw new NotImplementedException();
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
                        text: "Por favor, seleccione el servicio para el que desea sacar cita:",
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
                case "citaservicio":
                    string sucursalCitaServicio = query.Data.Split("_")[2];
                    int servicioCitaId;
                    if (int.TryParse(query.Data.Split("_")[1], out servicioCitaId))
                    {
                        Servicio serv = productoServicioManagement.RetrieveByIdServicio(new Servicio() { Id = servicioCitaId });
                        if (serv != null)
                        {
                            SendText(query.Message, "¡Perfecto!");
                            await botClient.SendTextMessageAsync(
                                chatId: query.Message.Chat,
                                text: "¿Cuándo desea su cita?",
                                replyMarkup: new InlineKeyboardMarkup(new[] { new[]
                                {
                                    InlineKeyboardButton.WithCallbackData("En 2 días.", "dateser_2_"+servicioCitaId.ToString()+"_"+sucursalCitaServicio),
                                    InlineKeyboardButton.WithCallbackData("En 3 días.", "dateser_3_"+servicioCitaId.ToString()+"_"+sucursalCitaServicio)
                                },
                                    new[]
                                    {
                                        InlineKeyboardButton.WithCallbackData("En 5 días.", "dateser_5_"+servicioCitaId.ToString()+"_"+sucursalCitaServicio),
                                        InlineKeyboardButton.WithCallbackData("En 7 días.", "dateser_7_"+servicioCitaId.ToString()+"_"+sucursalCitaServicio)
                                    }
                                }));
                        }
                        else
                        {
                            SendText(query.Message, "Lo siento...\n" +
                                "Ya no proveemos ese servicio por el momento.");
                        }
                    }
                    else
                    {
                        SendText(query.Message, "Producto no encontrado...");
                    }
                    break;
                case "citaproducto":
                    string sucursalCita = query.Data.Split("_")[2];
                    int productoCitaId;
                    if (int.TryParse(query.Data.Split("_")[1], out productoCitaId))
                    {
                        Producto producto = productoServicioManagement.RetrieveByIdProducto(new Producto() { Id = productoCitaId });
                        if (producto.Cantidad > 0)
                        {
                            SendText(query.Message, "¡Perfecto!");
                            await botClient.SendTextMessageAsync(
                                chatId: query.Message.Chat,
                                text: "¿Cuándo desea su cita?",
                                replyMarkup: new InlineKeyboardMarkup(new[] { new[]
                                {
                                    InlineKeyboardButton.WithCallbackData("En 2 días.", "dateprod_2_"+productoCitaId.ToString()+"_"+sucursalCita),
                                    InlineKeyboardButton.WithCallbackData("En 3 días.", "dateprod_3_"+productoCitaId.ToString()+"_"+sucursalCita)
                                },
                                    new[]
                                    {
                                        InlineKeyboardButton.WithCallbackData("En 5 días.", "dateprod_5_"+productoCitaId.ToString()+"_"+sucursalCita),
                                        InlineKeyboardButton.WithCallbackData("En 7 días.", "dateprod_7_"+productoCitaId.ToString()+"_"+sucursalCita)
                                    }
                                }));
                        }
                        else
                        {
                            SendText(query.Message, "Lo siento...\n" +
                                "Ya no tenemos ese producto por el momento.");
                        }
                    }
                    else
                    {
                        SendText(query.Message, "Producto no encontrado...");
                    }
                    break;
                case "dateprod":
                    string[] texto = query.Data.Split("_");
                    double dias;
                    int idProd;
                    if (double.TryParse(texto[1], out dias) && int.TryParse(texto[2], out idProd))
                    {
                        DateTime fecha = DateTime.Today.AddDays(dias);
                        Producto producto = productoServicioManagement.RetrieveByIdProducto(new Producto() { Id = idProd });
                        CitaProducto citaNueva = new CitaProducto()
                        {
                            Productos = new[] { producto },
                            IdSucursal = texto[3],
                            IdComercio = texto[3].Split("-")[0],
                            IdCliente = GetClienteId(query.Message.Chat.Id),
                            HoraInicio = fecha,
                            HoraFinal = fecha,
                            Estado = "P",
                            Tipo = "P"
                        };

                        if (citaNueva.IdCliente != null)
                        {
                            citasEnProceso.Remove(query.Message.Chat.Id.ToString());
                            citasEnProceso.Add(query.Message.Chat.Id.ToString(), citaNueva);
                            await botClient.SendTextMessageAsync(
                                chatId: query.Message.Chat,
                                text: "Perfecto, ahora solamente necesito que me envíes una hora.\n" +
                                "Envíala en el siguiente formato: 'hora_<la hora que deseas>', es decir, algo como 'hora_13', para una cita a la 1 PM.\n" +
                                "Ten en mente el horario de la sucursal y por favor solamente usa horas enteras.",
                                replyMarkup: new ForceReplyMarkup());
                        }
                        else { SendText(query.Message, "Lo siento, no puedo encontrarte en la base de datos..."); }
                    }
                    else
                    {
                        SendText(query.Message, "Lo siento, ocurrió un error al procesar la fecha...");
                    }
                    break;
                case "dateser":
                    string[] text = query.Data.Split("_");
                    double diasSer;
                    int idSer;
                    if (double.TryParse(text[1], out diasSer) && int.TryParse(text[2], out idSer))
                    {
                        DateTime fecha = DateTime.Today.AddDays(diasSer);
                        Servicio serv = productoServicioManagement.RetrieveByIdServicio(new Servicio() { Id = idSer });
                        Producto servicio = new Producto()
                        {
                            Id = serv.Id,
                            IdComercio = serv.IdComercio,
                            Impuesto = serv.Impuesto,
                            Descuento = serv.Descuento,
                            Duracion = serv.Duracion,
                            Precio = serv.Precio,
                            Nombre = serv.Nombre,
                            Tipo = serv.Tipo,
                            Cantidad = 0
                        };
                        CitaProducto citaNueva = new CitaProducto()
                        {
                            Productos = new[] { servicio },
                            IdSucursal = text[3],
                            IdComercio = text[3].Split("-")[0],
                            IdCliente = GetClienteId(query.Message.Chat.Id),
                            HoraInicio = fecha,
                            HoraFinal = fecha,
                            Estado = "P",
                            Tipo = "S"
                        };

                        if (citaNueva.IdCliente != null)
                        {
                            citasEnProceso.Remove(query.Message.Chat.Id.ToString());
                            citasEnProceso.Add(query.Message.Chat.Id.ToString(), citaNueva);
                            await botClient.SendTextMessageAsync(
                                chatId: query.Message.Chat,
                                text: "Perfecto, ahora solamente necesito que me envíes una hora.\n" +
                                "Envíala en el siguiente formato: 'hora_<la hora que deseas>', es decir, algo como 'hora_13', para una cita a la 1 PM.\n" +
                                "Ten en mente el horario de la sucursal y por favor solamente usa horas enteras.",
                                replyMarkup: new ForceReplyMarkup());
                        }
                        else { SendText(query.Message, "Lo siento, no puedo encontrarte en la base de datos..."); }
                    }
                    else
                    {
                        SendText(query.Message, "Lo siento, ocurrió un error al procesar la fecha...");
                    }
                    break;
                case "cancelar-cita":
                    InlineKeyboardMarkup listaCitas = ListarCitas(query.Message.Chat.Id);
                    if (listaCitas != null)
                    {
                        await botClient.SendTextMessageAsync(
                            chatId: query.Message.Chat.Id,
                            text: "Estas son tus citas pendientes:",
                            replyMarkup: listaCitas);
                    }
                    else { SendText(query.Message, "No tienes citas pendientes para cancelar."); }
                    break;
                case "cancCita":
                    int.TryParse(query.Data.Split("_")[1], out int citaId);
                    List<CitaProducto> listaCancelar = citaManagement.RetrieveAll();
                    CitaProducto citaCancelar = new CitaProducto() { Id = citaId };
                    foreach (var row in listaCancelar)
                    {
                        if (row.Id == citaId)
                            citaCancelar = row;
                    }
                    try
                    {
                        citaManagement.CancelarCitaUsuario(citaCancelar);
                        SendText(query.Message, "Cita cancelada.");
                    }
                    catch(Exception e) { SendText(query.Message, e.Message); }
                    break;
                case "cerrar-sesion":
                    CerrarSesion(query.Message);
                    break;
            }
        }

        private static void CerrarSesion(Message message)
        {
            UsuarioTelegram usuarioEliminar = new UsuarioTelegram() { IdUsuario = GetClienteId(message.Chat.Id) };
            usuarioTelegramManagement.Delete(usuarioEliminar);
            SendText(message, "Listo, cerré tu sesión.");
        }

        private static InlineKeyboardMarkup ListarCitas(long id)
        {
            List<CitaProducto> listaCitas = citaManagement.RetrieveAll();
            List<CitaProducto> citasCliente = new List<CitaProducto>();
            string userId = GetClienteId(id);
            foreach (var cita in listaCitas)
            {
                if (cita.IdCliente == userId && cita.Estado == "P")
                    citasCliente.Add(cita);
            }

            var btns = new InlineKeyboardButton[citasCliente.Count()][];
            int count = 0;
            if (citasCliente.Count > 0)
            {
                foreach (var row in citasCliente)
                {
                    Comercio comercio = comercioManagement.RetrieveById(new Comercio() { CedJuridica = row.IdComercio });
                    btns[count] = new[]
                    {
                    InlineKeyboardButton.WithCallbackData(
                        row.Productos[0].Nombre+" - "+comercio.NombreComercial +" - "+row.HoraInicio.Date.ToShortDateString()
                        , "cancCita_"+row.Id)
                };
                    count++;
                }
                return btns;
            }
            else { return null; }
        }

        private static string GetClienteId(long id)
        {
            List<UsuarioTelegram> usuarios = usuarioTelegramManagement.RetrieveAll();
            foreach (var user in usuarios)
            {
                if (user.IdChat == id.ToString())
                {
                    return user.IdUsuario;
                }
            }
            return null;
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
                        await botClient.SendTextMessageAsync(
                            chatId: mensaje.Chat,
                            text: "Puedes hacer lo siguiente:",
                            replyMarkup: new InlineKeyboardMarkup(new[]{
                                new[]{
                                    InlineKeyboardButton.WithCallbackData(
                                        "Cerrar Sesión",
                                        "cerrar-sesion_"),
                                    InlineKeyboardButton.WithCallbackData(
                                        "Cancelar Cita",
                                        "cancelar-cita")
                                },
                            new[]{ InlineKeyboardButton.WithCallbackData("Lista Comercios","listar-comercios")} }));
                    }
                    break;
                case "hora":
                    CitaProducto cita = citasEnProceso.GetValueOrDefault(mensaje.Chat.Id.ToString());
                    if (cita != null)
                    {
                        if (int.TryParse(mensaje.Text.Split("_")[1], out int hora))
                        {
                            cita.HoraInicio = cita.HoraInicio.AddHours(hora);
                            cita.HoraFinal = cita.HoraInicio.AddMinutes(cita.Productos[0].Duracion);

                            try
                            {
                                switch (cita.Tipo)
                                {
                                    case "P":
                                        citaManagement.Create(cita);
                                        break;
                                    case "S":
                                        citaManagement.CreateCitaServicio(cita);
                                        break;
                                }
                                citasEnProceso.Remove(mensaje.Chat.Id.ToString());
                                SendText(mensaje, $"¡Listo!\n" +
                                    $"Tu cita quedó registrada para la fecha {cita.HoraInicio}");
                            }
                            catch (Exception e)
                            {
                                SendText(mensaje, e.Message);
                            }
                        }
                        else { SendText(mensaje, "Hubo un problema procesado la hora que enviaste."); }
                    }
                    else { SendText(mensaje, "Lo siento, pero no tienes ninguna cita en proceso."); }
                    break;
                case "codigo":
                    ProcesarCodigo(mensaje);
                    break;
            }
        }

        private static void ProcesarCodigo(Message mensaje)
        {
            Usuario user = clientesIniciandoSesión.GetValueOrDefault(mensaje.Chat.Id.ToString());
            if (user != null && mensaje.Text.Split("_")[1] == user.Token)
            {
                UsuarioTelegram newUser = new UsuarioTelegram()
                {
                    IdChat = mensaje.Chat.Id.ToString(),
                    IdUsuario = user.Id
                };

                usuarioTelegramManagement.Create(newUser);
                clientesIniciandoSesión.Remove(newUser.IdChat);
                SendText(mensaje, $"¡Listo! Bienvenido, {user.Nombre}.");
            }
            else { SendText(mensaje, "Lo siento, el código que me enviaste no coincide."); }
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
                char[] letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
                char[] numeros = "0123456789".ToCharArray();
                string codigo = "";
                for (int i = 0; i < 4; i++)
                {
                    codigo += letras[random.Next(26)];
                    codigo += numeros[random.Next(10)];
                }

                user.Token = codigo;

                Execute(user).Wait();

                clientesIniciandoSesión.Remove(mensaje.Chat.Id.ToString());
                clientesIniciandoSesión.Add(mensaje.Chat.Id.ToString(),user);

                SendText(mensaje, "¡OK! Te debió llegar un correo con un código de verificación, ¿me lo podrías enviar con el siguiente formato?\n" +
                    "Formato: codigo_<el código que recibiste>, es decir, si tu código es 123 entonces sería 'codigo_123'");
            }
            else
            {
                SendText(mensaje, "Lo siento, pero no sé de ningún usuario registrado con esa cédula.");
            }
        }

        private static async Task Execute(Usuario user)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("brutchm@ucenfotec.ac.cr", "GetItSafely");
            var subject = "Codigo de verificacion de Telegram";
            var to = new EmailAddress(user.CorreoElectronico.ToString(), user.Nombre.ToString());
            var plainTextContent = ("Bienvenido a GetItSafely su codigo de verificacion es: " + user.Token.ToString() + ".");
            var htmlContent = "<strong>Bienvenido a GetItSafely su codigo de verificacion es: " + user.Token.ToString() + "." + "</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            _ = client.SendEmailAsync(msg);
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
