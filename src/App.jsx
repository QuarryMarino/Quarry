import CardSection from "../components/CardsSection/CardSection";
import Finish from "../components/Finish/Finish";
import Menu from "../components/Menu/Menu";
import Nav from "../components/Nav/Nav";
import Stays from "../components/Stays/Stays";
import "./index.css";
import stays from "../stays.json";

import { useState } from "react";


function App() {
  // La variable data es la que va a almacenar los datos de "stays.json" y setData nos ayudará a guardar esos datos en esa variable. Es necesario que inicialicemos esa variable como un array vacío para evitar errores.
  const [menuOpen, setMenuOpen] = useState(false);
  const [city, setCity] = useState("Ciudad");

  const [adultGuests, setAdultGuests] = useState(0);
  const [childrenGuests, setChildrenGuests] = useState(0);
  const [filteredStays, setFilteredStays] = useState(stays);

  const handleOpenClose = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchButton = () => {
    if (city === "WhoWle") {  
      return 0;
    }
    const filterLocation = stays.filter((stay) => stay.city.includes(city));
    const filterGuests = filterLocation.filter(
      (stay) => stay.maxGuests >= adultGuests + childrenGuests
    );
    if (filterGuests) {
      setFilteredStays(filterGuests);
    } else {
      setFilteredStays([]);
    }
    handleOpenClose();
  };

  const handlePlusButton = (param) => {
    if (param === "Adult") {
      setAdultGuests((prevAdultGuests) => prevAdultGuests + 1);
    } else if (param === "Children") {
      setChildrenGuests((prevChildrenGuests) => prevChildrenGuests + 1);
    }
  };

  const handleMinusButton = (param) => {
    if (param === "Adult") {
      setAdultGuests((prevAdultGuests) =>
        prevAdultGuests > 0 ? prevAdultGuests - 1 : 0
      );
    } else if (param === "Children") {
      setChildrenGuests((prevChildrenGuests) =>
        prevChildrenGuests > 0 ? prevChildrenGuests - 1 : 0
      );
    }
  };

  const guests = adultGuests + childrenGuests;

  return (
    <div className="app-container">
      <Menu
        menuOpen={menuOpen}
        handleOpenClose={handleOpenClose}
        childrenGuests={childrenGuests}
        adultGuests={adultGuests}
        handlePlusButton={handlePlusButton}
        handleMinusButton={handleMinusButton}
        city={city}
        setCity={setCity}
        handleSearchButton={handleSearchButton}
        guests={guests}
      />

      <div className="container ">
        <Nav handleOpenClose={handleOpenClose} city={city} guests={guests} />
        <Stays stays={filteredStays} />
        <CardSection stays={filteredStays} />
       <Finish/>
      </div>
    </div>
  );
}
// Esta sentencia try-catch sirve para manejar los errores que se podrían generar al importar los datos de "stays.json".



// Aquí guardamos los datos de "stays.json" en la variable data.




// Este Hook te va a ejecutar la función getData cada vez que la página se renderice.






export default App;
