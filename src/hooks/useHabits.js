import { useState, useCallback } from 'react';
import Api from '../services/Api';
import {useToast} from "./ToastContext";
import {useAuth} from "./AuthContext";
import {useNavigate} from "react-router-dom";

const HABITS_URL = process.env.REACT_APP_HABIT_URL + '/habits';

const useHabits = () => {
  const navigate = useNavigate()
  const { showToast } = useToast();
  const { logout } = useAuth();
  const [habits, setHabits] = useState([]);
  const [habit, setHabit] = useState(null); // Novo estado para hábito individual
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHabits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await Api.get(HABITS_URL, null,true);
      const result = await data.json()
      setHabits(result);
    } catch (err) {
      setError('Erro ao buscar hábitos');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHabitById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await Api.get(`${HABITS_URL}/${id}`, null,true);
      const result = await data.json()
      setHabit(result);
    } catch (err) {
      setError('Erro ao buscar hábito');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDashboard = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Api.get(`${HABITS_URL}/dashboard`, params,true);
      const result = await response.json();
      setDashboard(result);
    } catch (err) {
      setError('Erro ao buscar dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  const createHabit = useCallback(async (habit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Api.post(HABITS_URL, habit, true);
      await fetchHabits();
      if (response.status === 201) {
        showToast('Hábito cadastrado com sucesso!', 'success');
        navigate("/habits");
      }
      else if (response.status === 401) {
        showToast('Sessão expirada. Faça login novamente.', 'error');
        logout();
        navigate("/login");
      }
    } catch (err) {
      setError('Erro ao criar hábito');
    } finally {
      setLoading(false);
    }
  }, [fetchHabits]);

  const updateHabit = useCallback(async (id, habit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Api.put(`${HABITS_URL}/${id}`, habit, true);
      await fetchHabits();
      if (response.status === 200) {
        showToast('Hábito alterado com sucesso!', 'success');
        navigate("/habits");
      }
      else if (response.status === 401) {
        showToast('Sessão expirada. Faça login novamente.', 'error');
        logout();
        navigate("/login");
      }
    } catch (err) {
      setError('Erro ao atualizar hábito');
    } finally {
      setLoading(false);
    }
  }, [fetchHabits]);

  const deleteHabit = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await Api.delete(`${HABITS_URL}/${id}`, true);
      await fetchHabits();
    } catch (err) {
      setError('Erro ao remover hábito');
    } finally {
      setLoading(false);
    }
  }, [fetchHabits]);

  return {
    habits,
    habit,
    dashboard,
    loading,
    error,
    fetchHabits,
    fetchHabitById,
    fetchDashboard,
    createHabit,
    updateHabit,
    deleteHabit,
  };
};

export default useHabits;
