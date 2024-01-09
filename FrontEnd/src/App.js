import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from "./pages/register/RegisterPage";
import AccueilPage from "./pages/accueil/AccueilPage";
import Workspace from "./pages/workspace/Workspace";
import SearchPage from "./pages/search/SearchPage";
import CreateWorkspace from "./pages/workspace/CreateWorkspace"
import HomeWorkspace from "./pages/workspace/HomeWorkspace";
import {colors} from "./style/color";
import WorkspaceEdit from "./pages/workspace/WorkspaceEdit";
import WorkspaceEditUsers from "./pages/workspace/WorkspaceEditUsers";
import ActionReactionAutomate from "./pages/automate/ActionReactionAutomate";
import CreateAutomate from "./pages/automate/CreateAutomate";
import Service from "./pages/service/Service";
import ServiceSetting from "./pages/service/ServiceSetting";
import ProtectedRoute from './components/ProtectedRoute';
import { getWorkspaces } from './models/workspaces';

const App = () => {
    const workspaceList = [{
        name: 'SpotifyBangar',
        creator: 'Adilou le fifou',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nisl nisl lacinia nisl, vitae lacinia nisl nisl eget nisl. Donec euismod, nisl eget aliquam ultricies, nisl nisl lacinia nisl, vitae lacinia nisl nisl eget nisl.',
        color: colors.lightPurple,
        access: "Private",
        automates: [{
            name: "Automate 1",
            creator: "Adilou le fifou"
        },
            {
                name: "Automate 1",
                creator: "Adilou le fifou"
            }]
    }];
    const exampleUsers = [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Doe" },
        // Add more user objects as needed
    ];

    return (
    <Router>
      <Routes>
          <Route path="/" element={<Navigate to="/login" />}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage ButtonText="Continue" rightIconSrcOff="EyeOff" rightIconSrcOn="Eye" Title="What is your Email ?" InputPlaceholder="Email" inputType="email" leftIconSrc="User"/>} />
          <Route path="/search" element={<SearchPage />}/>
          <Route path="/homeWorkspace" element={<HomeWorkspace/>}/>
          <Route path="/workspaceEdit" element={<WorkspaceEdit/>} />
          <Route path="/workspaceEditUsers" element={<WorkspaceEditUsers users={exampleUsers}/>} />
          <Route path="/create" element={<CreateWorkspace/>} />
          <Route path="/actionReactionAutomate" element={<ActionReactionAutomate/>} />
          <Route path="/createAutomate" element={<CreateAutomate/>}/>
          <Route path="/service" element={<Service/>}/>
          <Route path="/serviceSetting" element={<ServiceSetting/>}/>
          <Route
            path="*" element={<Navigate to="/" />}
          />
          {workspaceList.map((workspace, index) => (
              <Route key={index} path="/workspace" element={<Workspace workspaceValues={workspace} />} />
          ))}
          <Route path="/accueil" element={
            <ProtectedRoute>
              <AccueilPage/>
            </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
};

export default App;
