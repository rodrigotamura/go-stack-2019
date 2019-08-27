import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      // who will receive this notification
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// we will import this Schema in AppointmentController or another useful controller.

export default mongoose.model('Notification', NotificationSchema);
