import React from "react";

const CourseDetails = ({ course }: { course: any }) => {
  if (!course) {
    return (
      <p className="text-center text-gray-500">No course data available.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        {course.name}
      </h1>

      <div className="flex justify-around border-b pb-4 mb-6">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">Difficulty</p>
          <p className="text-lg font-bold text-gray-800">
            {course.difficultyLevel}/5
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">Length</p>
          <p className="text-lg font-bold text-gray-800">
            {course.length} hours
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">Rating</p>
          <p className="text-lg font-bold text-gray-800">{course.rating}/10</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed">{course.description}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Materials
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {course.materials.map((material: string, index: number) => (
              <li key={index}>{material}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Instructions
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            {course.instructions.map((instruction: string, index: number) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </section>

        {course.tips && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Tips</h2>
            <p className="text-gray-700 leading-relaxed">{course.tips}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
