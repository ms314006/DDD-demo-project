class DomainEventPublisher {
  constructor() {
    this.domainEventSubscriberMap = new Map();
  }

  subscribe(subject, domainEventHandler) {
    if (this.domainEventSubscriberMap.has(subject)) {
      this.domainEventSubscriberMap.set(
        subject,
        [...this.domainEventSubscriberMap.get(subject), domainEventHandler]
      )
    } else {
      this.domainEventSubscriberMap.set(
        subject,
        [domainEventHandler]
      );
    }
  }

  publish(domainEvent) {
    (this.domainEventSubscriberMap.get(domainEvent.subject) || [])
      .forEach((domainEventHandler) => {
        domainEventHandler(domainEvent);
      })
  }
}

// 這邊用單例模式
export default new DomainEventPublisher();
