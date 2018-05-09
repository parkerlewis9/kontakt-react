import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const FormInstance = ({kontakt, onSubmit, handleTyping, fireRedirect, history, isEditForm, deleteKontakt}) => {
    return (
      <form onSubmit={(e) => {e.preventDefault(); onSubmit({ name: e.target[0].value,
                                                             phoneNumber: e.target[1].value,
                                                             emailAddress: e.target[2].value,
                                                             addressLineOne: e.target[3].value,
                                                             addressLineTwo: e.target[4].value,
                                                             state: e.target[5].value,
                                                             country: e.target[6].value,
                                                             zipcode: e.target[7].value,

                                                            })}}>
        <FieldGroup
          id="formControlsName"
          value={`${kontakt.name}`}
          onChange={(e) => {handleTyping(e.target.value, "name")}}
          type="text"
          label="Name"
          placeholder=""
        />
        <FieldGroup
          id="formControlsPhone"
          value={`${kontakt.phoneNumber}`}
          onChange={(e) => {handleTyping(e.target.value, "phoneNumber")}}
          type="text"
          label="Phone Number"
          placeholder=""
        />
        <FieldGroup
          id="formControlsEmail"
          value={`${kontakt.emailAddress}`}
          onChange={(e) => {handleTyping(e.target.value, "emailAddress")}}
          type="email"
          label="Email address"
          placeholder=""
        />
        <FieldGroup
          id="formControlsAddressLineOne"
          value={`${kontakt.addressLineOne}`}
          onChange={(e) => {handleTyping(e.target.value, "addressLineOne")}}
          type="text"
          label="Address"
          placeholder=""
        />
        <FieldGroup
          id="formControlsAddressLineTwo"
          value={`${kontakt.addressLineTwo}`}
          onChange={(e) => {handleTyping(e.target.value, "addressLineTwo")}}
          type="text"
          label="City"
          placeholder=""
        />
        <FieldGroup
          id="formControlsState"
          value={`${kontakt.state}`}
          onChange={(e) => {handleTyping(e.target.value, "state")}}
          type="text"
          label="State"
          placeholder=""
        />
        <FieldGroup
          id="formControlsCountry"
          value={`${kontakt.country}`}
          onChange={(e) => {handleTyping(e.target.value, "country")}}
          type="text"
          label="Country"
          placeholder=""
        />
        <FieldGroup
          id="formControlsZipcode"
          value={`${kontakt.zipcode}`}
          onChange={(e) => {handleTyping(e.target.value, "zipcode")}}
          type="text"
          label="Zipcode"
          placeholder=""
        />

        <Button type="submit">Submit</Button>

        <br/>
        <br/>

        {isEditForm ? <Button bsStyle="danger" onClick={() => deleteKontakt()}>Delete</Button> : <br/>}

        <br/>
        <br/>
      </form>
    );
}

const FieldGroup = ({ id, label, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

export default FormInstance;
