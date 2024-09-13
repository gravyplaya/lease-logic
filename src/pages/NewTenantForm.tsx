import {
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
  IonInput,
  IonLabel,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRouterLink,
  IonRow,
  IonText,
} from "@ionic/react";
import { useUser } from "@clerk/clerk-react";
import "./Home.css";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Search from "./Search";

import Vapi from "@vapi-ai/web";

const NewTenantForm: React.FC = () => {
  const [results, setResults] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [isVoiceActive, setisVoiceActive] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();

  const userId = isLoaded && isSignedIn ? user.id : null;

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

  useEffect(() => {
    if (isSignedIn) {
      formData.name = user?.fullName || "";
      formData.email = user?.primaryEmailAddress?.emailAddress || "";
      getResults();
    }
  }, [isSignedIn]);

  const toggleVoice = (e: any) => {
    setisVoiceActive(true);
    const vapi = new Vapi("11503214-2564-4029-b8e6-1d2bbc1c9d3e");
    vapi.start("e3c9f026-f392-4eb8-a906-1b325e4e14bd");
    if (vapi) {
      // vapi.on("call-start", () => console.log("Call started"));
      vapi.on("call-end", () => {
        console.log("Call ended");
        setisVoiceActive(false);
      });
      // vapi.on("message", (message) => console.log("New message:", message));
    }
    // Clean up on unmount
    return () => {
      vapi.stop();
      setisVoiceActive(false);
    };
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getResults = () => {
    fetch(
      "https://nocodb.tavonni.com/api/v2/tables/m1rhj6vo38oxsn9/records/?where=(UserId,eq," +
        user?.id +
        ")",
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
        setResults(data2.list[0]);
        setLoading(false);
      })
      .catch((error) => console.error("Error:", error));
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
            })
            .catch((error) => console.error("Error:", error));
        }, 8000);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <IonPage>
      <Header page="New Tenant" />
      <IonContent>
        {!results && (
          <form onSubmit={handleSubmit}>
            <IonGrid>
              <IonRow className="ion-justify-content-center">
                <IonCol size="auto" className="ion-text-center">
                  <IonButton
                    expand="block"
                    shape="round"
                    onClick={toggleVoice}
                    disabled={isVoiceActive}
                  >
                    Click here to apply with your voice
                  </IonButton>
                  <IonText>Or apply via phone. Call (231) 310 0300.</IonText>
                </IonCol>
              </IonRow>
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
          <>
            <IonCard>
              <IonCardContent>
                <IonText color="dark">
                  {results.Notes.split("\n").map(
                    (line: string, index: number) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    )
                  )}
                </IonText>
              </IonCardContent>
            </IonCard>
            {/* IF QUALIFIED */}
            {results && !results.Notes.includes("NOT QUALIFIED") && (
              <>
                {/* Pricing row */}
                <IonRow className="ion-justify-content-center ion-align-items-center">
                  <IonCol size="4">
                    <IonCard style={{ textAlign: "center" }}>
                      <IonCardHeader>
                        <IonCardSubtitle>Basic</IonCardSubtitle>
                        <IonCardTitle>$20/mo</IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>
                        3 applications
                        <IonButton
                          href={`https://buy.stripe.com/test_fZecMR6QkdRbdxK001?client_reference_id=${userId}`}
                          expand="block"
                          shape="round"
                        >
                          Subscribe Now
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="4">
                    <IonCard style={{ textAlign: "center" }}>
                      <IonCardHeader>
                        <IonCardSubtitle>Standard</IonCardSubtitle>
                        <IonCardTitle>$40/mo</IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>
                        10 applications{" "}
                        <IonButton
                          href={`https://buy.stripe.com/test_aEU28d4IcbJ38dq3ce?client_reference_id=${userId}`}
                          expand="block"
                          shape="round"
                        >
                          Subscribe Now
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="4">
                    <IonCard style={{ textAlign: "center" }}>
                      <IonCardHeader>
                        <IonCardSubtitle>Premium</IonCardSubtitle>
                        <IonCardTitle>$100/mo</IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>
                        Unlimited applications
                        <IonButton
                          href={`https://buy.stripe.com/test_aEU5kp8Ys14p79m7sv?client_reference_id=${userId}`}
                          expand="block"
                          shape="round"
                        >
                          Subscribe Now
                        </IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
                <Search
                  queryParams={{ bedrooms: parseInt(results.NumBedrooms) }}
                />
              </>
            )}
            {/* IF  NOT QUALIFIED */}
            {results && results.Notes.includes("**NOT QUALIFIED**") && (
              <>
                You didn't qualify. Would you like to try again? Here are some
                resources that may help.
              </>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NewTenantForm;
