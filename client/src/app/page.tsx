
async function Loader() {
  const path="/api/home-page?populate=*";
  const BASE_URL = "http://localhost:1337";
  const url = new URL(path, BASE_URL);
  
  const res = await fetch(url.href);
  const data = await res.json();
  console.log(data);
  return { ...data.data};
 }

export default async function HomeRoute() {
  const data = await Loader();
  console.log(data);
  return (
   <div> 
    <h1>{data.title}</h1>
    <p>{data.description}</p>
    <p>{data.email}</p>
    <img src={"http://localhost:8080" + data.img_url.url} alt="Image" />
  </div>
  );
}
