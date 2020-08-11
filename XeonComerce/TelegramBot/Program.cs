using Entities;
using Management;
using System;
using System.Collections.Generic;
using System.Reflection;
using Telegram.Bot;
using Telegram.Bot.Args;

namespace TelegramBot
{
    class Program
    {
        static ITelegramBotClient botClient;
        static UsuarioTelegramManagement management;

        static void Main()
        {
            botClient = new TelegramBotClient("1117317312:AAFBPk8r2P9B1EO5oLQ6bgesfxRE8iojefk");

            var me = botClient.GetMeAsync().Result;
            Console.WriteLine(
              $"Hello, World! I am user {me.Id} and my name is {me.FirstName}."
            );

            botClient.OnMessage += Bot_OnMessage;
            botClient.StartReceiving();

            Console.WriteLine("Press any key to exit");
            Console.ReadKey();

            botClient.StopReceiving();
        }

        static async void Bot_OnMessage(object sender, MessageEventArgs e)
        {
            switch (e.Message.Text)
            {
                default:
                    sendText(e, "Opción Inválida...");
                    break;
                case "/help":
                case "/ayuda":
                    sendText(e, "Este es el mensaje de /ayuda\n" +
                        "Por ahora puedes /iniciar_sesion\n");
                    break;
                case "/iniciar_sesion":
                case "/login":
                    if (isLoggedIn(e.Message.Chat.Id.ToString()))
                    {
                        sendText(e, "Ya iniciaste la sesión");
                    }
                    else
                    {
                        sendText(e, "Envíame tu número de cédula para agregarte.");
                    }
                    break;
            }
        }

        private static bool isLoggedIn(string id)
        {
            management = new UsuarioTelegramManagement();
            List<UsuarioTelegram> usuarios = management.RetrieveAll();
            foreach (UsuarioTelegram user in usuarios)
            {
                if (user.IdChat == id)
                {
                    Console.WriteLine($"User is logged in");
                    return true;
                }
            }
            return false;
        }

        private static async void sendText(MessageEventArgs e, string mensaje)
        {
            await botClient.SendTextMessageAsync(
                chatId: e.Message.Chat,
                text: mensaje
                );
        }
    }
}
