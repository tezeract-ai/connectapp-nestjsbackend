import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import admin from "../../firebase-admin";
@Injectable()
export class NotificationsService {
  async sendNotification(token) {
    console.log("token",token)
    // This registration token comes from the client FCM SDKs.
    const registrationToken = token;

    const message = {
      data: {
        score: "850",
        time: "2:45",
      },
      token: registrationToken,
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin
      .messaging()
      .send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  }
}
