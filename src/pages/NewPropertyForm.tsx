import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SignUpSignIn from "../components/SignUpSignIn";
import { useUser } from "@clerk/clerk-react";
import "./Home.css";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const NewPropertyForm: React.FC = () => {
  const [results, setResults] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: "",
    jobDuration: "",
    income: "",
    creditScore: "",
    dependents: "",
    currentRent: "",
    occupants: "",
    moveDate: "",
    pets: "",
    smokers: "",
    bedrooms: "",
    evictions: "",
    validId: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://nocodb.tavonni.com/api/v2/tables/m1rhj6vo38oxsn9/records", {
      method: "POST",
      headers: {
        accept: "application/json",
        "xc-auth": import.meta.env.VITE_NOCODB_TOKEN,
        "xc-token": import.meta.env.VITE_NOCODB_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        JobLength: formData.jobDuration,
        CreditScore: formData.creditScore,
        MonthlyIncome: formData.income,
        Dependents: formData.dependents,
        CurrentRent: formData.currentRent,
        NumOccupants: formData.occupants,
        Evictions: formData.evictions,
        MoveInDate: formData.moveDate,
        Pets: formData.pets,
        Smokers: formData.smokers,
        NumBedrooms: formData.bedrooms,
        ValidID: formData.validId,
        Name: formData.name,
        Email: formData.email,
        Phone: formData.phone,
        UserId: user?.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          fetch(
            "https://nocodb.tavonni.com/api/v2/tables/m1rhj6vo38oxsn9/records/" +
              data.Id +
              "?fields=Notes",
            {
              method: "GET",
              headers: {
                accept: "application/json",
                "xc-auth": import.meta.env.VITE_NOCODB_TOKEN,
                "xc-token": import.meta.env.VITE_NOCODB_TOKEN,
                "Content-Type": "application/json",
              },
            }
          )
            .then((response2) => response2.json())
            .then((data2) => {
              setResults(data2.Notes);
              setLoading(false);
              const formElement = document.querySelector("form");
              if (formElement) {
                formElement.style.filter = "blur(8px)";
              }
            })
            .catch((error) => console.error("Error:", error));
        }, 8000);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <IonPage>
      <Header page="New Property" />
      <IonContent>
        {!results && (
          <form onSubmit={handleSubmit}>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <IonLabel position="stacked">Name</IonLabel>
                  <IonInput
                    name="name"
                    value={formData.name}
                    onIonChange={handleInputChange}
                    required
                    class="custom"
                  />
                </IonCol>
                <IonCol size="4">
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    name="email"
                    type="email"
                    value={formData.email}
                    onIonChange={handleInputChange}
                    required
                    class="custom"
                  />
                </IonCol>
                <IonCol size="4">
                  <IonLabel position="stacked">Phone</IonLabel>
                  <IonInput
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onIonChange={handleInputChange}
                    required
                    class="custom"
                  />
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="4">
                  <IonLabel position="stacked">
                    When do you want to move into the rental?
                  </IonLabel>

                  <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

                  <IonModal keepContentsMounted={true}>
                    <IonDatetime
                      id="datetime"
                      name="moveDate"
                      onIonChange={handleInputChange}
                      presentation="date"
                    ></IonDatetime>
                  </IonModal>
                  <IonInput
                    name="moveDate"
                    value={formData.moveDate}
                    onIonChange={handleInputChange}
                    required
                    class="custom"
                    style={{ visibility: "hidden" }}
                  />
                </IonCol>
                <IonCol size="4">
                  <IonLabel position="stacked">
                    How long have you been at your current job or are you moving
                    to Muskegon from another city for work, if so do you have an
                    offer letter?
                  </IonLabel>
                  <IonInput
                    name="jobDuration"
                    value={formData.jobDuration}
                    onIonChange={handleInputChange}
                    required
                    class="custom"
                  />
                </IonCol>
                <IonCol size="4">
                  <IonLabel position="stacked">
                    What do you make per month from one job for a regular 40
                    hour work week? (Income from overtime, moon lighting, second
                    jobs and side gigs will not included in the gross qualifying
                    income)
                  </IonLabel>
                  <IonInput
                    name="income"
                    type="number"
                    value={formData.income}
                    onIonChange={handleInputChange}
                    required
                    class="custom"
                  />
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="4">
                  <IonLabel position="stacked">
                    What is your credit score? (best guess is okay)
                  </IonLabel>
                  <IonInput
                    name="creditScore"
                    type="number"
                    value={formData.creditScore}
                    onIonChange={handleInputChange}
                    required
                    class="custom"
                  />
                </IonCol>
                <IonCol size="4">
                  <IonLabel position="stacked">
                    How Many Dependents Will Be Occupying the rental?
                  </IonLabel>
                  <IonInput
                    name="dependents"
                    type="number"
                    value={formData.dependents}
                    onIonChange={handleInputChange}
                    required
                    class="custom"
                  />
                </IonCol>
                <IonCol size="4">
                  <IonLabel position="stacked">
                    What are you paying now for housing per month?
                  </IonLabel>
                  <IonInput
                    name="currentRent"
                    type="number"
                    value={formData.currentRent}
                    onIonChange={handleInputChange}
                    required
                    class="custom"
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">
                  <IonLabel position="stacked">
                    How many many people including you will be moving in?
                  </IonLabel>
                  <IonInput
                    name="occupants"
                    type="number"
                    value={formData.occupants}
                    onIonChange={handleInputChange}
                    required
                    class="custom"
                  />
                </IonCol>
                <IonCol size="4">
                  <IonLabel position="stacked">
                    Do you have any evictions?
                  </IonLabel>
                  <IonRadioGroup
                    name="evictions"
                    onIonChange={handleInputChange}
                    value={formData.evictions}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "30px",
                    }}
                  >
                    <IonRadio value="Yes">Yes</IonRadio>
                    <IonRadio value="No">No</IonRadio>
                  </IonRadioGroup>
                </IonCol>
                <IonCol size="4">
                  <IonLabel position="stacked">
                    How many bedrooms are you looking to rent?
                  </IonLabel>
                  <IonInput
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onIonChange={handleInputChange}
                    required
                    class="custom"
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">
                  <IonLabel position="stacked">
                    Do you have a valid State Issued ID and Social Security
                    Card?
                  </IonLabel>
                  <IonRadioGroup
                    name="validId"
                    onIonChange={handleInputChange}
                    value={formData.validId}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "30px",
                    }}
                  >
                    <IonRadio value="Yes">Yes</IonRadio>
                    <IonRadio value="No">No</IonRadio>
                  </IonRadioGroup>
                </IonCol>
                <IonCol size="4">
                  <IonLabel position="stacked">
                    Do you have pets that will occupy the rental with you?
                  </IonLabel>
                  <IonRadioGroup
                    name="pets"
                    value={formData.pets}
                    onIonChange={handleInputChange}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "30px",
                    }}
                  >
                    <IonRadio value="Yes">Yes</IonRadio>
                    <IonRadio value="No">No</IonRadio>
                  </IonRadioGroup>
                </IonCol>
                <IonCol size="4">
                  <IonLabel position="stacked">
                    Do any of the occupants smoke?
                  </IonLabel>
                  <IonRadioGroup
                    name="smokers"
                    value={formData.smokers}
                    onIonChange={handleInputChange}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "30px",
                    }}
                  >
                    <IonRadio value="Yes">Yes</IonRadio>
                    <IonRadio value="No">No</IonRadio>
                  </IonRadioGroup>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonButton expand="full" type="submit" disabled={loading}>
              <b>{loading ? "Please Wait" : "Submit"}</b>
            </IonButton>
          </form>
        )}
        {results && (
          <p>
            {results.split("\n").map((line: string, index: number) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NewPropertyForm;
