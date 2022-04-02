import React from 'react';

interface ErrorAlertProps {
  message: string;
  destroy: () => void;
}

interface ErrorAlertState {
  interval: number;
}

class ErrorAlert extends React.Component<ErrorAlertProps, ErrorAlertState> {
  interval: ReturnType<typeof setTimeout> | null = null;
  alertRef = React.createRef<HTMLDivElement>();

  constructor(props: ErrorAlertProps) {
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
      <div ref={this.alertRef} className="error-alert">
        {this.props.message}
      </div>
    );
  }
}

export default ErrorAlert;
