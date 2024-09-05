import {
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./Header.css";

interface ContainerProps {}

const Faqs: React.FC<ContainerProps> = () => {
  return (
    <>
      <h1 className="ion-text-center">FAQ's</h1>
      <IonAccordionGroup>
        <IonAccordion value="first">
          <IonItem slot="header" color="light">
            <IonLabel>What is the tenant vetting process?</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            Tenant vetting is a screening process used to evaluate potential
            tenants. It involves checking credit scores, rental history,
            employment verification, and conducting background checks to ensure
            the tenant is reliable and capable of meeting lease obligations.
            With Lease Logic we instantly pre-qualify you for properties we
            manage.
          </div>
        </IonAccordion>
        <IonAccordion value="second">
          <IonItem slot="header" color="light">
            <IonLabel>How long does the tenant vetting process take?</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            The tenant vetting process typically takes between 24 to 72 hours,
            depending on the responsiveness of references and the availability
            of necessary documentation. But with Lease Logic we handle that in
            less than 10 seconds.
          </div>
        </IonAccordion>
        <IonAccordion value="third">
          <IonItem slot="header" color="light">
            <IonLabel>Can I apply for multiple properties at once?</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            Yes, you can apply for multiple properties. Usually, each
            application will require a separate vetting process and fee. But
            with Lease Logic you pay one fee and its good for all applications
            up to the limit of the package you choose.
          </div>
        </IonAccordion>
        <IonAccordion value="forth">
          <IonItem slot="header" color="light">
            <IonLabel>What is Lease Logic and how does it work?</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            Lease Logic is your one-stop shop for applying for a lease on a home
            or apartment. With just one payment you can apply to multiple
            properties that you are already pre-qualified for, increasing your
            chances of a successful application.
          </div>
        </IonAccordion>
        <IonAccordion value="fifth">
          <IonItem slot="header" color="light">
            <IonLabel>
              What happens after my subscription expires or after I sign a
              lease?
            </IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            You can continue to be a member and get extra optional services for
            a discounted price. Some services may include: apartment setup
            package, roomate matching service, moving assistance, renters
            insurance, lease renewal assistance, among others. We also have a
            referral program where if you refer someone to Lease Logic and they
            sign a lease we split their first payment with you.
          </div>
        </IonAccordion>
        <IonAccordion value="sixth">
          <IonItem slot="header" color="light">
            <IonLabel>
              Why should I use Lease Logic instead of applying like I normally
              do?
            </IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            It's simple, do you want to pay $35 with each application or pay
            less than that per month for multiple applications. In addition
            since you are pre-qualified you won't apply for a lease you don't
            have a good chance to get. Decreasing the cost to apply to multiple
            properties and increasing your chances approved.
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </>
  );
};

export default Faqs;
