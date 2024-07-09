import * as React from "react";

import Button from "../components/Button/Button.jsx";
import Group from "../components/Group/Group.jsx";
import Link from "../components/Link/Link.jsx";
import Section from "../components/Section/Section.jsx";
import Text from "../components/Text/Text.jsx";
import TextInput from "../components/TextInput/TextInput.jsx";

class BackendURLForm extends React.Component {
  constructor(props) {
    super(props);

    let localstorageUrlCache = window.localStorage.getItem(
      "terminal.backendUrl"
    );

    this.state = {
      // backendURL: "https://dev-actibookly.pantheonsite.io/wp-json/custom-api/v1"
      backendURL: "https://alchemix.co/wp-json/custom-api/v1"
    };
  }

  onFormInitialize = event => {
    event.preventDefault();
    this.props.onSetBackendURL(this.state.backendURL.trim());
  };

  onChangeBackendURL = str => {
    this.setState({ backendURL: str });
  };
  componentDidMount() {
    this.props.onSetBackendURL(this.state.backendURL.trim());
  }
  render() {
    const { backendURL } = this.state;
    return (
      <Section>

      </Section>
    );
  }
}

export default BackendURLForm;
