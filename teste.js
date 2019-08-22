teste = [
  {
    id: "1",
    title: "titulo1",
    tasks: []
  },
  {
    id: "2",
    title: "titulo2",
    tasks: []
  }
];

console.log(teste[1].id);

for (projeto of teste) {
  if (projeto.id == 2) {
    console.log("id é igual");
    projeto.title = "titulomodificado2";
  }
  console.log(projeto);
}
