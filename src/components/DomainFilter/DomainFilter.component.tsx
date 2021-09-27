import React from 'react';
import { threadId } from 'worker_threads';

interface State {
  countries: string[],
  classifications: string[],
  subClassifications: string[]
}

interface Props {
  domains: string[]
}

class DomainFilter extends React.Component<Props, State> {
  componentDidMount() {
    const { domains } = this.props
    this.state = {
      countries: [],
      classifications: [],
      subClassifications: []
    }

    // Not useful?
    // const s: any = {};

    // Modify loop to make it clearer - Not understandable enough
    for (let i = 0; i < domains.length; i++) {
      if (this.state.countries.indexOf(domains[i].substring(0, 2)) <= 0) {
        this.state.countries.push(domains[i].substring(0, 2));
        console.log(this.state.countries);
      }
      this.state.classifications.push(domains[i].substring(3, 5));
      let flag = false;

      // Modify loop to make it clearer as well
      for (let j = 0; j < this.state.subClassifications.length; j++) {
        if (this.state.subClassifications[j] == domains[i].substring(6)) {
          flag = true
          console.log('With flag', this.state.subClassifications);
          break;
        }
      }
      if (!flag) {
        this.state.subClassifications.push(domains[i].substring(6));
        console.log('No flag', this.state.subClassifications);
      }
    }

    // Clarify parameters of the filter
    this.setState({
      ...this.state,
      classifications: this.state.classifications.filter((e, i, l) => l.indexOf(e) === i),
    })
    this.forceUpdate()
  }

  render() {
    const { countries, classifications, subClassifications } = this.state || {
      countries: [],
      classifications: [],
      subClassifications: []
    };

    return (<>
      <select name="countries" multiple>
        {countries.map(country => (
          <option value={country} key={country}>{country}</option>
        ))}
      </select>
      <select name="classifications" multiple>
        {classifications.map(classification => (
          <option value={classification} key={classification}>{classification}</option>
        ))}
      </select>
      <select name="subClassifications" multiple>
        {subClassifications.map(subClassification => (
          <option value={subClassification} key={subClassification}>{subClassification}</option>
        ))}
      </select>
    </>)
  }
}

export default DomainFilter
