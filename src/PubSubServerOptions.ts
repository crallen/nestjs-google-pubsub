interface ClientConfig {
  projectId?: string;
  keyFilename?: string;
  apiEndpoint?: string;
  email?: string;
  credentials?: {
    client_email?: string;
    private_key?: string;
  };
  autoRetry?: boolean;
  maxRetries?: number;
}

export interface PubSubServerOptions extends ClientConfig {
  topics: PubSubTopicMapping;
}

export interface PubSubTopicMapping {
  [topicId: string]: SubscriptionOptions;
}

export interface SubscriptionOptions {
  subscriptionId: string;
}
