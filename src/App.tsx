import { TbSettings } from "react-icons/tb";
import { useAuthContext } from "./contexts/AuthContext";
import Tooltip from "./components/ui/Tooltip/Tooltip";
import Button from "./components/ui/Button/Button";

function App() {
  const { logOut } = useAuthContext();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h1>hello There. You're signed in!</h1>

      <Button
        variant="outline"
        size="lg"
        style={{ width: "15rem", fontWeight: 600 }}
        onClick={logOut}
      >
        log out
        <Tooltip position="left">
          testing big tooltip text Insert template make sure to add aria-label
          attribute to all icon only buttons ( to enable screen readers to tell
          what the button does. make sure to add aria-label attribute to all
          icon only buttons ( to enable screen readers to tell what the button
          does.
        </Tooltip>
        <Tooltip>Insert template</Tooltip>
      </Button>

      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1rem",
          maxWidth: "25rem",
          margin: "0 auto",
        }}
      >
        <Button variant="solid" size="md">
          Invite member
        </Button>
        <Button variant="solid" size="sm">
          <TbSettings />
          Settings
        </Button>
        <Button variant="solid" size="md" iconOnly>
          <TbSettings />
        </Button>
        <Button variant="solid" size="sm" iconOnly>
          <TbSettings />
        </Button>
        <Button variant="solid" size="xs" iconOnly>
          <TbSettings />
        </Button>

        <Button variant="outline" size="md">
          Invite member
        </Button>
        <Button variant="outline" size="sm">
          <TbSettings />
          Settings
        </Button>
        <Button variant="outline" size="md" iconOnly>
          <TbSettings />
        </Button>
        <Button variant="outline" size="sm" iconOnly>
          <TbSettings />
        </Button>
        <Button variant="outline" size="xs" iconOnly>
          <TbSettings />
        </Button>

        <Button size="md">Invite member</Button>
        <Button size="sm">
          <TbSettings />
          Settings
        </Button>
        <Button size="md" iconOnly>
          <TbSettings />
        </Button>
        <Button size="sm" iconOnly>
          <TbSettings />
        </Button>
        <Button variant="ghost" size="xs" iconOnly>
          <TbSettings />
        </Button>

        <Button variant="danger" size="md">
          Invite member
        </Button>
        <Button variant="danger" size="sm">
          <TbSettings />
          Settings
        </Button>
        <Button variant="danger" size="md" iconOnly>
          <TbSettings />
        </Button>
        <Button variant="danger" size="sm" iconOnly>
          <TbSettings />
        </Button>
        <Button variant="danger" size="xs" iconOnly>
          <TbSettings />
        </Button>

        <Button variant="ghost-danger" size="md">
          Invite member
        </Button>
        <Button variant="ghost-danger" size="sm">
          <TbSettings />
          Settings
        </Button>
        <Button variant="ghost-danger" size="md" iconOnly>
          <TbSettings />
        </Button>
        <Button variant="ghost-danger" size="sm" iconOnly>
          <TbSettings />
        </Button>
        <Button variant="ghost-danger" size="xs" iconOnly>
          <TbSettings />
        </Button>
      </div>
    </div>
  );
}

export default App;
