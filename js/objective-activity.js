document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_STATE_KEY = "objective-activity";
  const CORRECT_ALTERNATIVE = "b";

  const alternatives = document.querySelectorAll(".alternative");
  const checkboxes = document.querySelectorAll(".alternative-checkbox");
  const submitBtn = document.getElementById("objective-submit");
  const editBtn = document.getElementById("objective-edit");
  const correctFeedback = document.getElementById(
    "objective-correct-answer-feedback"
  );
  const incorrectFeedback = document.getElementById(
    "objective-incorrect-answer-feedback"
  );

  const getSelectedAlternative = () => {
    const checked = document.querySelector(
      ".alternative-checkbox:checked"
    );
    return checked ? checked.value : null;
  };

  const highlightSelected = () => {
    const selected = getSelectedAlternative();
    alternatives.forEach((alt) => {
      const checkbox = alt.querySelector(".alternative-checkbox");
      if (selected && checkbox.value === selected) {
        alt.classList.add("active");
      } else {
        alt.classList.remove("active");
      }
    });
  };

  const updateSubmitButton = () => {
    const hasSelection = getSelectedAlternative() !== null;
    const wasAnswered = !editBtn.disabled;
    submitBtn.disabled = !hasSelection || wasAnswered;
  };

  const showFeedback = (isCorrect) => {
    if (isCorrect) {
      correctFeedback.style.display = "flex";
      incorrectFeedback.style.display = "none";
    } else {
      correctFeedback.style.display = "none";
      incorrectFeedback.style.display = "flex";
    }
  };

  const setAlternativesDisabled = (disabled) => {
    alternatives.forEach((alt) => {
      if (disabled) {
        alt.classList.add("alternative--disabled");
      } else {
        alt.classList.remove("alternative--disabled");
      }
    });
  };

  const saveState = () => {
    const isAnswered = !editBtn.disabled;
    const state = {
      selectedAlternative: getSelectedAlternative(),
      isAnswered: isAnswered,
      isCorrect: isAnswered && getSelectedAlternative() === CORRECT_ALTERNATIVE,
      submitDisabled: submitBtn.disabled,
      editDisabled: editBtn.disabled,
      checkboxesDisabled: isAnswered,
      alternativesDisabled: alternatives[0].classList.contains("alternative--disabled"),
      correctFeedbackVisible: correctFeedback.style.display === "flex",
      incorrectFeedbackVisible: incorrectFeedback.style.display === "flex",
    };
    sessionStorage.setItem(STORAGE_STATE_KEY, JSON.stringify(state));
  };

  const restoreState = () => {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_STATE_KEY));

    if (saved) {
      if (saved.selectedAlternative) {
        const checkbox = document.querySelector(
          `.alternative-checkbox[value="${saved.selectedAlternative}"]`
        );
        if (checkbox) {
          checkbox.closest(".alternative").classList.add("active");
          checkbox.checked = true;
        }
      }

      if (saved.checkboxesDisabled) {
        checkboxes.forEach((cb) => (cb.disabled = true));
      }

      if (saved.alternativesDisabled) {
        setAlternativesDisabled(true);
      }

      submitBtn.disabled = saved.submitDisabled;
      editBtn.disabled = saved.editDisabled;

      if (saved.correctFeedbackVisible) {
        correctFeedback.style.display = "flex";
      } else if (saved.incorrectFeedbackVisible) {
        incorrectFeedback.style.display = "flex";
      }
    }
  };

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      highlightSelected();
      updateSubmitButton();
      saveState();
    });
  });

  submitBtn.addEventListener("click", () => {
    const selected = getSelectedAlternative();
    if (selected) {
      checkboxes.forEach((cb) => (cb.disabled = true));
      const isCorrect = selected === CORRECT_ALTERNATIVE;
      showFeedback(isCorrect);
      submitBtn.disabled = true;
      editBtn.disabled = false;
      setAlternativesDisabled(true);
      saveState();
    }
  });

  editBtn.addEventListener("click", () => {
    checkboxes.forEach((cb) => (cb.disabled = false));
    correctFeedback.style.display = "none";
    incorrectFeedback.style.display = "none";
    submitBtn.disabled = false;
    editBtn.disabled = true;
    setAlternativesDisabled(false);
    highlightSelected();
    saveState();
  });

  const closeBtns = document.querySelectorAll(".answer-feedback-close");
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      correctFeedback.style.display = "none";
      incorrectFeedback.style.display = "none";
      saveState();
    });
  });

  restoreState();
  updateSubmitButton();
});