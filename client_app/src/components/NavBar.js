import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { Button, Segment, Divider, Form, Input } from 'semantic-ui-react';

import { PageTypeEnum, getType } from '../helpers/MovieTypeHelper';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: props.params.text || '',
    };
    this.types = [];
    const keys = Object.getOwnPropertyNames(PageTypeEnum);
    for (let key in keys) {
      let val = PageTypeEnum[keys[key]];
      if (!val.isActive) continue;
      this.types.push(val);
    }
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchClear = this.onSearchClear.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.createCheckBox = this.createCheckBox.bind(this);
  }

  updateCheckboxes(types) {
    this.selectedCheckboxes = new Set();
    if (!types) return;
    types
      .split(',')
      .filter(type => getType(type) != null)
      .forEach(type => this.selectedCheckboxes.add(+type));
  }

  componentWillMount() {
    this.updateCheckboxes(this.props.location.query.types);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.searchStr !== nextProps.params.text)
      this.setState({ searchStr: nextProps.params.text || '' });
    if (nextProps.location.query.types !== this.props.location.query.types) {
      this.updateCheckboxes(nextProps.location.query.types);
    }
  }

  onSearchSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const text = this.state.searchStr || '';
    let addr =
      text === ''
        ? '/'
        : `/${encodeURIComponent('искать')}/${encodeURIComponent(text)}`;
    const types = this.props.location.query.types || '';
    browserHistory.push(addr + (types !== '' ? '?types=' + types : ''));
  };

  onSearchClear = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ searchStr: '' });
    const types = this.props.location.query.types || '';
    browserHistory.push(types !== '' ? '/?types=' + types : '/');
  };

  onSearchChange = e => {
    const text = e.target.value || '';
    this.setState({ searchStr: text });
  };

  toggleCheckbox = (e, state) => {
    const key = +state.name;
    this.selectedCheckboxes.has(key)
      ? this.selectedCheckboxes.delete(key)
      : this.selectedCheckboxes.add(key);
    const types = this.types
      .filter(type => this.selectedCheckboxes.has(type.val))
      .map(type => type.val)
      .join(',');

    const text = this.state.searchStr || '';
    let addr =
      text === ''
        ? '/'
        : `/${encodeURIComponent('искать')}/${encodeURIComponent(text)}`;
    browserHistory.push(addr + (types !== '' ? '?types=' + types : ''));
  };

  createCheckBox = type => (
    <Form.Checkbox
      label={type.caption}
      onChange={this.toggleCheckbox}
      key={type.val}
      name={[] + type.val}
      checked={this.selectedCheckboxes.has(type.val)}
    />
  );

  render() {
    return (
      <div className="topNav">
        <Form onSubmit={this.onSearchSubmit}>
          <Input fluid size="big" action>
            <input
              name="text"
              placeholder="Искать по имени..."
              onChange={this.onSearchChange}
              value={this.state.searchStr}
            />
            <Button
              name="submit"
              disabled={
                !this.state.searchStr ||
                this.state.searchStr === this.props.params.text
              }
              type="submit"
              icon="search"
              size="big"
            />
            <Button
              name="cancel"
              disabled={!this.props.params.text}
              type="cancel"
              onClick={this.onSearchClear}
              icon="close"
              size="big"
            />
          </Input>
        </Form>
        <Segment>
          <Form>
            <Form.Group inline>
              {this.types.map(this.createCheckBox)}
            </Form.Group>
          </Form>
        </Segment>
        <Divider hidden />
      </div>
    );
  }
}

export default NavBar;
