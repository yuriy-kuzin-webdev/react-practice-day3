import React, { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";

import BudgetCard from "./components/BudgetCard";
import { useBudget } from "./contexts/BudgetsContext";

const App = () => {
  const [showBudgetModal, setShowAddBudgetModal] = useState(false);
  const { budgets, getBudgetExpenses } = useBudget();
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button
            variant="primary"
            onClick={() => {
              setShowAddBudgetModal(true);
            }}
          >
            Add Budget
          </Button>
          <Button variant="outline-primary">Add Expense</Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
              ></BudgetCard>
            );
          })}
        </div>
      </Container>
      <AddBudgetModal
        show={showBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
    </>
  );
};

export default App;
