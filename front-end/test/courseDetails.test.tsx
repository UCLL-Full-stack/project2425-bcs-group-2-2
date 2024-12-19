import React from "react";
import CourseDetails from "../components/courses/courseDetails";
import { render, screen } from "@testing-library/react";

window.React = React;

const course = {
  name: "Beginner knitted cast-on",
  difficultyLevel: 1,
  length: 1,
  rating: 9,
  description: "Learn how to cast on and begin your project.",
  materials: ["Wooden needles", "Yarn"],
  instructions: [
    "Make a slip knot and put it on your needle.",
    "Hold this needle in your left hand and take the second needle in your right hand.",
    "Pass the needle in the right hand through the loop on the left needle.",
    "With your left hand, wrap the working yarn around your left hand.",
    "Bring the right needle back through the loop on the left needle.",
    "Now you have a loop around your right needle. Turn the loop and pull.",
    "Pull the yarn and you have two stitches casted on.",
    "To continue, repeat from step 2.",
  ],
};

test("given: course exist, when: user navigates to courses page, then: course is passed to component and details shown", () => {
  render(<CourseDetails course={course} />);
  expect(screen.getByText("Beginner knitted cast-on"));
});
