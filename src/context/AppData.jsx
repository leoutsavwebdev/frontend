import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import {
  getInitialEvents,
  getInitialUsers,
  getInitialCoordActive,
  getInitialParticipants,
  getInitialLeaderboards,
  getInitialCoordRequests,
  getInitialWinners,
  saveEvents,
  saveUsers,
  saveCoordActive,
  saveParticipants,
  saveLeaderboards,
  saveCoordRequests,
  saveWinners,
} from "../data/sampleData";

const AppDataContext = createContext(null);

const initialState = {
  users: getInitialUsers(),
  events: getInitialEvents(),
  coordActive: getInitialCoordActive(), // { [coordId]: [eventId, eventId] }
  participants: getInitialParticipants(), // { [eventId]: [{ studentId, name, leoId, paymentType, paymentStatus, arrived, screenshot, transactionId }] }
  leaderboards: getInitialLeaderboards(), // { [eventId]: [{ participantId, name, leoId, score }] }
  coordRequests: getInitialCoordRequests(), // [{ id, email, name, status }]
  winners: getInitialWinners(), // { [eventId]: [studentId] }
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EVENTS":
      return { ...state, events: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_COORD_ACTIVE":
      return { ...state, coordActive: action.payload };
    case "SET_PARTICIPANTS":
      return { ...state, participants: action.payload };
    case "SET_LEADERBOARDS":
      return { ...state, leaderboards: action.payload };
    case "SET_COORD_REQUESTS":
      return { ...state, coordRequests: action.payload };
    case "SET_WINNERS":
      return { ...state, winners: action.payload };
    default:
      return state;
  }
}

export function AppDataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    saveEvents(state.events);
  }, [state.events]);
  useEffect(() => {
    saveUsers(state.users);
  }, [state.users]);
  useEffect(() => {
    saveCoordActive(state.coordActive);
  }, [state.coordActive]);
  useEffect(() => {
    saveParticipants(state.participants);
  }, [state.participants]);
  useEffect(() => {
    saveLeaderboards(state.leaderboards);
  }, [state.leaderboards]);
  useEffect(() => {
    saveCoordRequests(state.coordRequests);
  }, [state.coordRequests]);
  useEffect(() => {
    saveWinners(state.winners);
  }, [state.winners]);

  const setEvents = useCallback((events) => dispatch({ type: "SET_EVENTS", payload: events }), []);
  const setUsers = useCallback((users) => dispatch({ type: "SET_USERS", payload: users }), []);
  const setCoordActive = useCallback((v) => dispatch({ type: "SET_COORD_ACTIVE", payload: v }), []);
  const setParticipants = useCallback((v) => dispatch({ type: "SET_PARTICIPANTS", payload: v }), []);
  const setLeaderboards = useCallback((v) => dispatch({ type: "SET_LEADERBOARDS", payload: v }), []);
  const setCoordRequests = useCallback((v) => dispatch({ type: "SET_COORD_REQUESTS", payload: v }), []);
  const setWinners = useCallback((v) => dispatch({ type: "SET_WINNERS", payload: v }), []);

  const value = {
    ...state,
    setEvents,
    setUsers,
    setCoordActive,
    setParticipants,
    setLeaderboards,
    setCoordRequests,
    setWinners,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
