const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['link', 'file', 'video', 'text'],
      default: 'link',
    },
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: function requiredUrl() {
        return this.type !== 'text';
      },
    },
    content: {
      type: String,
      required: function requiredContent() {
        return this.type === 'text';
      },
    },
  },
  { _id: false }
);

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    durationMinutes: {
      type: Number,
      default: 60,
    },
    interactivePrompts: [
      {
        question: {
          type: String,
          required: true,
        },
        expectedResponse: String,
      },
    ],
    resources: [resourceSchema],
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Mechanical Engineering',
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    durationWeeks: {
      type: Number,
      default: 1,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tags: [String],
    published: {
      type: Boolean,
      default: false,
    },
    thumbnailUrl: String,
    lessons: [lessonSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', courseSchema);
