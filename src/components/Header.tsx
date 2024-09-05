import { IonHeader, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import "./Header.css";
import SignUpSignIn from "./SignUpSignIn";

interface ContainerProps {
  page?: string;
}

const Header: React.FC<ContainerProps> = (props) => {
  const router = useIonRouter();

  const handleTitleClick = () => {
    router.push("/home", "root", "replace");
  };

  return (
    <IonHeader mode="ios" translucent={true} collapse="fade">
      <IonToolbar>
        <IonTitle
          size="large"
          onClick={handleTitleClick}
          style={{ cursor: "pointer" }}
          slot="start"
        >
          Lease Logic
        </IonTitle>
        <IonTitle>{props.page}</IonTitle>
        <IonTitle slot="end">
          <SignUpSignIn />
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
