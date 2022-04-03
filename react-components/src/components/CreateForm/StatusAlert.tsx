import React from 'react';

interface StatusAlertProps {
  type: 'error' | 'success';
  message: string;
  destroy: () => void;
}

interface StatusAlertState {
  interval: number;
}

class StatusAlert extends React.Component<StatusAlertProps, StatusAlertState> {
  interval: ReturnType<typeof setTimeout> | null = null;
  alertRef = React.createRef<HTMLDivElement>();

  constructor(props: StatusAlertProps) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => this.alertRef.current?.classList.add('hide'), 4000);
    this.interval = setTimeout(() => this.props.destroy(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval!);
  }

  render() {
    return (
      <div ref={this.alertRef} className={`alert alert--${this.props.type}`}>
        {this.props.message}
      </div>
    );
  }
}

export default StatusAlert;
