export interface PubSubServerOptions {
  projectId?: string;
  topics: PubSubTopicMapping;
}

export interface PubSubTopicMapping {
  [topicId: string]: string;
}
