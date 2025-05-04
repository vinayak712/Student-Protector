import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'senderModel',
    required: true
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['Student', 'Teacher', 'Admin']
  },
  files: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  }],
  important: {
    type: Boolean,
    default: false
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'userModel'
    },
    userModel: {
      type: String,
      enum: ['Student', 'Teacher', 'Admin']
    }
  }],
  comments: [{
    text: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'commentUserModel'
    },
    userModel: {
      type: String,
      enum: ['Student', 'Teacher', 'Admin']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Virtual for like count
AnnouncementSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
AnnouncementSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

export default Announcement;