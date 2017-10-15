using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace FRI3NDS.SetLoto.Web.Controllers
{
	/// <summary>
	/// Контроллер билетов.
	/// </summary>
	[Route("api/Ticket")]
	public class TicketController : Controller
	{
		public TicketController()
		{
			this.random = new Random();
		}

		public Random random { get; set; }

		/// <summary>
		/// Распознать номера на билете по картинке.
		/// </summary>
		/// <param name="ьщвуд"></param>
		[HttpPost("RecognizeNumbers")]
		public Ticket RecognizeNumbers([FromBody]RecognizeNumbersViewModel model)
		{
			Thread.Sleep(1000);
			List<TicketLine> ticketLines = new List<TicketLine>();
			for (var i = 0; i < 6; i++)
			{
				ticketLines.Add(TicketLine.FromList(Enumerable.Range(0, 5).Select(e => random.Next(90))));
			}
			return new Ticket(ticketLines);
		}
	}

	/// <summary>
	/// Модель данных для распознавания картинки с билетом.
	/// </summary>
	public class RecognizeNumbersViewModel
	{
		/// <summary>
		/// Картинка с билетом в base64.
		/// </summary>
		public string ImageBase64 { get; set; }
	}

	public class Ticket
	{
		public Ticket()
		{
		}

		public Ticket(List<TicketLine> ticketLines)
		{
			this.TicketLines = ticketLines;
		}

		public List<TicketLine> TicketLines { get; set; }
	}

	public class TicketLine
	{
		public TicketLine()
		{
		}
		public TicketLine(List<int> numbers)
		{
			this.Numbers = numbers;
		}
		public List<int> Numbers { get; set; }


		public static TicketLine FromList(IEnumerable<int> numbers)
		{
			return new TicketLine(numbers.ToList());
		}
	}
}
