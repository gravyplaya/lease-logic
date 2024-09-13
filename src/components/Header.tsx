import {
  IonHeader,
  IonIcon,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import "./Header.css";
import SignUpSignIn from "./SignUpSignIn";
import { settings } from "ionicons/icons";
import { useUser } from "@clerk/clerk-react";

interface ContainerProps {
  page?: string;
}

const Header: React.FC<ContainerProps> = (props) => {
  const router = useIonRouter();
  const { isSignedIn } = useUser();

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
          <div
            style={{
              display: "inline-flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            {isSignedIn && (
              <>
                <IonRouterLink href="/profile">
                  <IonIcon icon={settings} color="dark"></IonIcon>
                </IonRouterLink>
              </>
            )}
            <SignUpSignIn />
          </div>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
