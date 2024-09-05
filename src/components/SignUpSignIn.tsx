import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { IonButton } from "@ionic/react";

const SignUpSignIn: React.FC = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <div>
      <SignedOut>
        <SignInButton>
          <IonButton>Sign In</IonButton>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        {/* {isSignedIn && <p>Welcome back, {user?.firstName}!</p>} */}
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default SignUpSignIn;
