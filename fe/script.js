async function getAnimalData() {
    console.log("getting animal data");
    const response = await fetch("https://fakerapi.it/api/v1/persons");
    console.log(await response.json());
}