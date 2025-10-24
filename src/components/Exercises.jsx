import React from 'react';
import ExerciseCard from './ExercisesCard';

const Exercises = ({ exercises, loading, error }) => {
    if (loading) {
        return <div className="text-center py-20 text-xl font-semibold">Loading exercises...</div>;
    }
    if (error) {
        return <div className="text-center py-20 text-xl font-semibold text-red-500">{error}</div>;
    }
    if (exercises.length === 0) {
        return <div className="text-center py-20 text-xl font-semibold text-gray-600">No exercises found. Try a different search.</div>;
    }
    return (
        <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {exercises.map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Exercises;

