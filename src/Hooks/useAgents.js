import { useEffect, useState } from 'react';
import {
  createAgent,
  deleteAgent,
  listAgents,
  updateAgent,
} from '../Api/AgentsApi';

export function useAgents({ clearSelectedAgent, updateSelectedAgent }) {
  const [agents, setAgents] = useState([]);
  const [agentsLoading, setAgentsLoading] = useState(true);
  const [agentError, setAgentError] = useState('');

  useEffect(() => {
    listAgents()
      .then(setAgents)
      .catch((error) => setAgentError(error.message))
      .finally(() => setAgentsLoading(false));
  }, []);

  const saveAgent = async (agent) => {
    setAgentError('');
    try {
      const savedAgent = await createAgent(agent);
      setAgents((currentAgents) => [...currentAgents, savedAgent]);
      return true;
    } catch (error) {
      setAgentError(error.message);
      return false;
    }
  };

  const removeAgent = async (agent) => {
    setAgentError('');
    try {
      await deleteAgent(agent.id);
      setAgents((currentAgents) =>
        currentAgents.filter((currentAgent) => currentAgent.id !== agent.id)
      );
      clearSelectedAgent(agent.id);
    } catch (error) {
      setAgentError(error.message);
    }
  };

  const editAgent = async (agent) => {
    setAgentError('');
    try {
      const savedAgent = await updateAgent(agent.id, agent);
      setAgents((currentAgents) =>
        currentAgents.map((currentAgent) =>
          currentAgent.id === savedAgent.id ? savedAgent : currentAgent
        )
      );
      updateSelectedAgent(savedAgent);
      return true;
    } catch (error) {
      setAgentError(error.message);
      return false;
    }
  };

  return {
    agents,
    agentsLoading,
    agentError,
    saveAgent,
    removeAgent,
    editAgent,
  };
}
