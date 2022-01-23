import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import MainCard from "../components/MainCard";
import MainCardModal from "../components/MainCardModal";
import "../assets/css/Main.css";

import { useQuery } from "@apollo/client";
import { QUERY_ALL_ANIMALS } from "../utils/queries";

export default function Main() {
  const { loading, data } = useQuery(QUERY_ALL_ANIMALS);
  const animals = data?.animals || [];

  // modal state/handlers
  const [selectedAnimal, setSelectedAnimal] = useState(); // for the modal
  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = (e) => {
    setModalShow(!modalShow);
    const id = e.target.getAttribute("data-modal-id");
    const matchingContent = animals.filter((animal) => animal._id === id)[0];
    setSelectedAnimal(matchingContent);
  };

  const animalTypes = animals.filter(
    (val, index, array) => array.findIndex((t) => t.type === val.type) === index
  );

  // filter state/handler
  const [selectedType, setSelectedType] = useState(); // for animal type
  const handleFilterDropdown = (e) => {
    const type = e.target.getAttribute("data-animal-type");
    // matchingTypeAnimal = animals.filter((animal) => animal.type === type);
    setSelectedType(type);
    // console.log(matchingTypeAnimal);
    // return matchingTypeAnimal;
    // function showMainCard() {
    //   if (matchingTypeAnimal) {
    //     return (
    //       <>
    //         {animals
    //           ? animals.map((animal, index) => (
    //               <div className="card-container m-5 border-0 " key={index}>
    //                 <MainCard
    //                   animal={animal}
    //                   handleModalShow={handleModalShow}
    //                   animaltypeinfo={selectedType}
    //                 />
    //               </div>
    //             ))
    //           : null}
    //       </>
    //     );
    //   } else {
    //     <>
    //       {animals
    //         ? animals.map((animal, index) => (
    //             <div className="card-container m-5 border-0 " key={index}>
    //               <MainCard animal={animal} handleModalShow={handleModalShow} />
    //             </div>
    //           ))
    //         : null}
    //     </>;
    //   }
    // }
  };

  const renderAnimalCards = () => {
    let filteredAnimals = animals;
    if (selectedType) {
      filteredAnimals = filteredAnimals.filter(
        (animal) => animal.type === selectedType
      );
    }
    return filteredAnimals
      ? filteredAnimals.map((animal, index) => (
          <div className="card-container m-5 border-0 " key={index}>
            <MainCard animal={animal} handleModalShow={handleModalShow} />
          </div>
        ))
      : null;
  };

  return (
    <div className="main-container">
      <div className="header">
        <Header />
      </div>
      <div className="main-content text-center">
        <h3>ADOPT</h3>
        {loading ? <div>Loading...</div> : null}
        <div>
          {animalTypes
            ? animalTypes.map((animalType, index) => (
                <div className="mt-3 px-2 d-inline-block" key={index}>
                  <Dropdown
                    animalType={animalType}
                    handleFilterDropdown={handleFilterDropdown}
                  />
                </div>
              ))
            : null}
        </div>

        {/* <div>{showMainCard()}</div> */}
        {renderAnimalCards()}

        {/* {matchingTypeAnimal
          ? matchingTypeAnimal.map((animal, index) => (
              <div className="card-container m-5 border-0 " key={index}>
                <MainCard animal={animal} />
              </div>
            ))
          : null} */}

        <MainCardModal
          show={modalShow}
          animalinfo={selectedAnimal}
          onHide={() => setModalShow(false)}
        />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
