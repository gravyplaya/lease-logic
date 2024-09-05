import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import Header from "../components/Header";
import "./Home.css";

interface SearchResult {
  Id: number;
  Bedrooms: number;
  Bathrooms: number;
  Rent: number;
  Address: string;
  Amenities: string;
  Description: string;
  SquareFootage: string;
  PropertyType: string;
  Parking: string;
  Furnished: string;
  Availability: string;
  UtilitiesIncluded: [];
}

interface SearchProps {
  queryParams?: {
    bedrooms?: number;
    bathrooms?: number;
    rent?: number;
  };
}

const Search: React.FC<SearchProps> = ({ queryParams }) => {
  const [bedrooms, setBedrooms] = useState<number | undefined>(
    queryParams?.bedrooms
  );
  const [bathrooms, setBathrooms] = useState<number | undefined>(
    queryParams?.bathrooms
  );
  const [rent, setRent] = useState<number | undefined>(queryParams?.rent);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );
  useEffect(() => {
    handleSubmit(); // Call handleSubmit on component load
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    // e.preventDefault();
    try {
      const queryParams = new URLSearchParams({
        bedrooms: bedrooms?.toString() || "",
        bathrooms: bathrooms?.toString() || "",
        rent: rent?.toString() || "",
      }).toString();

      const response = await fetch(
        `https://n8n.tavonni.com/webhook/propertysearch?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error submitting search:", error);
      // Handle errors here (e.g., show error message to user)
    }
  };

  const handleRowClick = (result: SearchResult) => {
    setSelectedResult(result === selectedResult ? null : result);
  };

  return (
    <IonGrid>
      {/* <IonRow>
            <IonCol>
              <form onSubmit={handleSubmit}>
                <IonItem>
                  <IonLabel position="floating">Bedrooms</IonLabel>
                  <IonInput
                    type="number"
                    value={bedrooms}
                    onIonChange={(e) =>
                      setBedrooms(parseInt(e.detail.value!, 10))
                    }
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Bathrooms</IonLabel>
                  <IonInput
                    type="number"
                    value={bathrooms}
                    onIonChange={(e) =>
                      setBathrooms(parseInt(e.detail.value!, 10))
                    }
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Max Rent</IonLabel>
                  <IonInput
                    type="number"
                    value={rent}
                    onIonChange={(e) => setRent(parseInt(e.detail.value!, 10))}
                  />
                </IonItem>
                <IonButton expand="block" type="submit">
                  Search
                </IonButton>
              </form>
            </IonCol>
          </IonRow> */}
      {searchResults.length > 0 && (
        <>
          <IonRow>
            <IonCol size="12">
              <h2>Search Results</h2>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="3">
              <strong>Address</strong>
            </IonCol>
            <IonCol size="2">
              <strong>Bedrooms</strong>
            </IonCol>
            <IonCol size="2">
              <strong>Bathrooms</strong>
            </IonCol>
            <IonCol size="2">
              <strong>Rent</strong>
            </IonCol>
            <IonCol size="3">
              <strong>Action</strong>
            </IonCol>
          </IonRow>
          {searchResults.map((result) => (
            <React.Fragment key={result.Id}>
              <IonRow
                onClick={() => handleRowClick(result)}
                style={{ cursor: "pointer" }}
                className={selectedResult === result ? "selected-row" : ""}
              >
                <IonCol size="3">{result.Address}</IonCol>
                <IonCol size="2">{result.Bedrooms}</IonCol>
                <IonCol size="2">{result.Bathrooms}</IonCol>
                <IonCol size="2">${result.Rent}</IonCol>
                <IonCol size="3">
                  <IonButton expand="block">Schedule Tour</IonButton>
                </IonCol>
              </IonRow>
              {selectedResult === result && (
                <IonRow>
                  <IonCol size="12">
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle>{result.Address}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <p>
                          <strong>Description:</strong> {result.Description}
                        </p>
                        <p>
                          <strong>Square Footage:</strong>{" "}
                          {result.SquareFootage}
                        </p>
                        <p>
                          <strong>Property Type:</strong> {result.PropertyType}
                        </p>
                        <p>
                          <strong>Parking:</strong> {result.Parking}
                        </p>
                        <p>
                          <strong>Furnished:</strong> {result.Furnished}
                        </p>
                        <p>
                          <strong>Availability:</strong> {result.Availability}
                        </p>
                        <p>
                          <strong>Amenities:</strong> {result.Amenities}
                        </p>
                        <p>
                          <strong>Utilities Included:</strong>{" "}
                          {/* {result.UtilitiesIncluded.join(", ")} */}
                        </p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </IonGrid>
  );
};

export default Search;
