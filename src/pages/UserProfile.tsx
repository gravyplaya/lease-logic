import React from "react";
import { useUser } from "@clerk/clerk-react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
} from "@ionic/react";
import Header from "../components/Header";

const UserProfile: React.FC = () => {
  const { user } = useUser();

  if (!user) return <div>Loading...</div>;

  return (
    <IonPage>
      <Header page="Profile" />

      <IonContent fullscreen className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Name</h2>
              <p>{user.fullName}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Email</h2>
              <p>{user.primaryEmailAddress?.emailAddress}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonButton
              href="https://billing.stripe.com/p/login/test_00gbLo7ayc6m0HC6oo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Manage Billing
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
