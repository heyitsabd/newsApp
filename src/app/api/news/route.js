// export async function GET() {
//   const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
//   const url = `https://newsapi.org/v2/top-headlines/sources?country=us&apiKey=${API_KEY}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.status !== "ok") {
//       return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
//         status: 500,
//       });
//     }
//     console.log("data", data);
//     return new Response(JSON.stringify(data.sources), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//     });
//   }
// }
