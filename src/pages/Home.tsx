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
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonRouterLink,
} from "@ionic/react";
import SignUpSignIn from "../components/SignUpSignIn";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Faqs from "../components/Faqs";

import { useUser } from "@clerk/clerk-react";

import "./Home.css";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [userLink, setUserLink] = useState<string | undefined>("");
  const userId = isLoaded && isSignedIn ? user.id : null;

  useEffect(() => {
    if (isLoaded) {
      getResults();
    }
  }, [isLoaded]);

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
        if (data2.list.length === 0) {
          setUserLink(
            `https://buy.stripe.com/test_fZecMR6QkdRbdxK001?client_reference_id=${userId}`
          );
        } else {
          setUserLink("/newtenantform");
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />

        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol size="12">
              <Hero />
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size="6" className="text-center">
              <div style={{ maxWidth: 400, textAlign: "center" }}>
                <h2>For Tenants</h2>
                <p>
                  Get vetted and apply to multiple properties without paying an
                  application fee each time.
                </p>
                {!isSignedIn && (
                  <>
                    Please sign in to get started. <SignUpSignIn />
                  </>
                )}
                {isSignedIn && (
                  <>
                    <IonRouterLink href="/newtenantform">
                      <IonButton shape="round">Get Started</IonButton>
                    </IonRouterLink>
                  </>
                )}
              </div>
            </IonCol>
            <IonCol size="6">
              <img src="/images/tenant-parking.jpg" />
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size="6">
              <img src="/images/forrent.jpg" />
            </IonCol>
            <IonCol size="6" className="text-center">
              <div style={{ maxWidth: 400, textAlign: "center" }}>
                <h2>For Landlords</h2>
                <p>Get quality pre-qualified tenants hastle-free.</p>
                {!isSignedIn && (
                  <>
                    Please sign in to get started. <SignUpSignIn />
                  </>
                )}
                {isSignedIn && (
                  <>
                    <IonRouterLink href="/NewPropertyForm">
                      <IonButton shape="round">Get Started</IonButton>
                    </IonRouterLink>
                    {/* <IonButton shape="round">Manage Properties</IonButton> */}
                  </>
                )}
              </div>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size="6">
              <IonCard style={{ textAlign: "center" }}>
                <img alt="Sign Lease" src="/images/sign-lease.jpg" />
                <IonCardHeader>
                  <IonCardTitle>Let us guide you home</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  Our simple vetting tool will make sure you easily qualify for
                  your next home.
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard style={{ textAlign: "center" }}>
                <img alt="Property" src="/images/property.jpg" />
                <IonCardHeader>
                  <IonCardTitle>Your Property, Our Priority!</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  Take the hastle out of finding tenants. Our vetted qualified
                  tenants will make leasing a breeze.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
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
                  {/* <IonButton
                    href={`https://buy.stripe.com/test_fZecMR6QkdRbdxK001?client_reference_id=${userId}`}
                    expand="block"
                    shape="round"
                  >
                    Subscribe Now
                  </IonButton> */}
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
                  {/* <IonButton
                    href={`https://buy.stripe.com/test_aEU28d4IcbJ38dq3ce?client_reference_id=${userId}`}
                    expand="block"
                    shape="round"
                  >
                    Subscribe Now
                  </IonButton> */}
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
                  {/* <IonButton
                    href={`https://buy.stripe.com/test_aEU5kp8Ys14p79m7sv?client_reference_id=${userId}`}
                    expand="block"
                    shape="round"
                  >
                    Subscribe Now
                  </IonButton> */}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          {/* FAQ row */}
          <IonRow>
            <IonCol className="ion-padding">
              <Faqs />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
