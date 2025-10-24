import React, { useState, useEffect } from 'react';
import LandingSection from '../components/LandingPage.jsx';
import SearchExercises from '../components/SearchExercises.jsx';
import Exercises from '../components/Exercises.jsx';
import { apiFetch } from '../services/api.jsx';

const HomePage = () => {
    const [exercises, setExercises] = useState([]);
    const [bodyParts, setBodyParts] = useState([]);
    const [search, setSearch] = useState('');
    const [bodyPart, setBodyPart] = useState('all');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBodyParts = async () => {
            const data = await apiFetch('exercises/bodyPartList');
            if (Array.isArray(data)) {
                setBodyParts(['all', ...data]);
            }
        };
        fetchBodyParts();
    }, []);

    useEffect(() => {
        const fetchExercisesData = async () => {
            setLoading(true);
            setError(null);
            let exercisesData = [];

            try {
                if (bodyPart !== 'all') {
                    exercisesData = await apiFetch(`exercises/bodyPart/${bodyPart}`);
                } else {
                    exercisesData = await apiFetch('exercises');
                }

                if (search) {
                    exercisesData = exercisesData.filter(
                        (ex) =>
                        ex.name.toLowerCase().includes(search) ||
                        ex.target.toLowerCase().includes(search) ||
                        ex.equipment.toLowerCase().includes(search) ||
                        ex.bodyPart.toLowerCase().includes(search)
                    );
                }

                if (Array.isArray(exercisesData)) {
                    setExercises(exercisesData);
                } else {
                    setExercises([]);
                }
            } catch (err) {
                setError("Failed to load exercise data.");
                setExercises([]);
            }

            setLoading(false);
        };

        fetchExercisesData();
    }, [search, bodyPart]);

    return (
        <>
            <LandingSection />
            <SearchExercises 
                search={search}
                setSearch={setSearch}
                bodyPart={bodyPart}
                setBodyPart={setBodyPart}
                bodyParts={bodyParts.filter(p => p !== 'all')}
            />
            <Exercises exercises={exercises} loading={loading} error={error} />
        </>
    );
};

export default HomePage;
