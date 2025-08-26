# GoldFish

GoldFish is a simple Node.js server that manages tasks and publishes new tasks to an MQTT broker. It provides a minimal REST API for adding and listing tasks, and integrates with [HiveMQ Cloud](https://www.hivemq.com/mqtt-cloud-broker/) for MQTT messaging.

## Features

- **Add tasks** via HTTP POST
- **List all tasks** via HTTP GET
- **MQTT integration**: Publishes new tasks to a broker

## Requirements

- Node.js 18.x
- [MQTT broker credentials](https://www.hivemq.com/mqtt-cloud-broker/)

## Installation

```sh
git clone https://github.com/dansbuzincu/GoldFish.git
cd GoldFish
npm install
```

## Usage

Start the server:

```sh
npm start
```

By default, the server listens on port `3000`. You can override this with the `PORT` environment variable.

## API

### Add a Task

**POST** `/task`

- Request body (JSON):
  ```json
  { "text": "Your task description" }
  ```
- Response:
  ```json
  {
    "ok": true,
    "added": { "id": 1, "text": "Your task description", "ts": 1680000000000 },
    "total": 1
  }
  ```

### List Tasks

**GET** `/tasks`

- Response:
  ```json
  {
    "count": 1,
    "tasks": [
      { "id": 1, "text": "Your task description", "ts": 1680000000000 }
    ]
  }
  ```

## MQTT

When a new task is added, its text is published to the `task/new` topic on the configured MQTT broker.

## Configuration

Edit the MQTT connection details in [`index.js`](index.js):

```js
const mqtt_url = "your-broker-url";
const mqtt_port = 8883;
const mqtt_hostname = "mqtts://" + mqtt_url + ":" + mqtt_port;
const mqtt_client = mqtt.connect(mqtt_hostname, {
  username: "your-username",
  password: "your-password"
});
```

## License

ISC

---

Made with
