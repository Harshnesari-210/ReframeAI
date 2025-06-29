import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import ChatInterface from "../generate.jsx"; // Your component
import "@testing-library/jest-dom"
import Login from "../login.jsx";


test("renders a heading in the ChatInterface component", () => {
  render(
    <MemoryRouter> {/* Wrap with MemoryRouter */}
      <ChatInterface />
    </MemoryRouter>
  );
  
  const heading = screen.getByRole("heading");
  expect(heading).toBeInTheDocument();
});

test("renders a history in the page ", () => {
    render(
      <MemoryRouter> {/* Wrap with MemoryRouter */}
        <ChatInterface />
      </MemoryRouter>
    );
    
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });


  test("renders a buttons in the ChatInterface component", () => {
    render(
      <MemoryRouter> 
        <ChatInterface />
      </MemoryRouter>
    );
    
    const heading = screen.getByRole("button");
    expect(heading).toBeInTheDocument();
  });

  test("after login renders to the generate page", ()=>{
    render(
        <MemoryRouter> 
        <Login />
      </MemoryRouter>
    )
    const heading = screen.getByRole("heading");
       expect(heading).toBeInTheDocument();
  })
