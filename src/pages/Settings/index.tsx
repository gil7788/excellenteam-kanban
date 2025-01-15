import React from "react";
import Layout from "../../layout";
import SettingsMenu from "../../components/SettingsMenu";
import Footer from "../../components/Footer";

const Settings: React.FC = () => {
  return (
    <Layout>
      <SettingsMenu />
      <Footer />
    </Layout>
  );
};

export default Settings;
