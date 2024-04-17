# Flow Specification

This document provides an overview of the design and implementation decisions behind Flow.

## Core Concepts

### Channels

Channels serve as units within Flow, providing a means to categorize and manage messages effectively. Each channel acts as a container for messages, for the organization of data streams. When creating a channel, users define its name and may optionally include metadata for additional context. Channels support a maximum message capacity of 100,000 and can concurrently process up to 1,000 messages at a time by default. Messages within a channel are processed in the order they are received, ensuring consistent handling of data.

### Messages

Messages represent discrete units of data transmitted within Flow. These messages encapsulate the information being exchanged or processed within the system. By default, each message can carry a payload of up to 512 kilobytes. However, users have the option to customize this limit based on their requirements. Messages serve as the building blocks of data transmission and processing in Flow. They are processed within the context of a specific channel, ensuring logical separation and organization of data streams. Messages can contain various types of information, ranging from simple text payloads to complex data structures, depending on the needs of the application.

### Queues

Queues in Flow represent a type of workload that is processed sequentially in the background. These queues ensure that tasks are executed in the order they are received. Queues are particularly useful for handling tasks such as sending requests to external APIs, where strict sequencing and error handling is needed. Each queue operates independently, allowing for parallel processing of multiple queues.

### Jobs

Jobs in Flow are scheduled tasks designed to execute at specific times or intervals. These tasks are typically recurring and automated, performing predefined actions at predetermined intervals. Users can define jobs through the Flow interface, specifying the task to be executed and the schedule for its execution. Upon reaching the scheduled time, Flow triggers an HTTP `POST` request to the designated endpoint, initiating the execution of the job.