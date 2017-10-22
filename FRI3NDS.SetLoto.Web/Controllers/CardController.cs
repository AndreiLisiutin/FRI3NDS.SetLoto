using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;

namespace FRI3NDS.SetLoto.Web.Controllers
{
	/// <summary>
	/// Контроллер билетов.
	/// </summary>
	[Route("api/Card")]
	public class CardController : Controller
	{
		public CardController()
		{
			this.random = new Random();
		}

		public Random random { get; set; }

		/// <summary>
		/// Распознать номера на билете по картинке.
		/// </summary>
		/// <param name="ьщвуд"></param>
		[HttpPost("RecognizeNumbers")]
		public Card RecognizeNumbers(IFormFile uploads)
		{
			using (var fileStream = new FileStream("C:/" + uploads.FileName, FileMode.Create))
			{
				uploads.CopyTo(fileStream);
			}


			Thread.Sleep(1000);
			List<CardLine> ticketLines = new List<CardLine>();
			for (var i = 0; i < 6; i++)
			{
				ticketLines.Add(CardLine.FromList(Enumerable.Range(0, 5).Select(e => random.Next(90))));
			}
			return new Card(ticketLines);
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

		public IFormFile uploads { get; set; }
	}

	public class Card
	{
		public Card()
		{
		}

		public Card(List<CardLine> ticketLines)
		{
			this.CardLines = ticketLines;
		}

		public List<CardLine> CardLines { get; set; }
	}

	public class CardLine
	{
		public CardLine()
		{
		}
		public CardLine(List<int> numbers)
		{
			this.Numbers = numbers;
		}
		public List<int> Numbers { get; set; }


		public static CardLine FromList(IEnumerable<int> numbers)
		{
			return new CardLine(numbers.ToList());
		}
	}
}
