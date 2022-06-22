import React, { SyntheticEvent, useRef } from "react";
import { ButtonAttributes } from "../../types";
import Button from "../ui/Button";
import styles from "./EventsSearchForm.module.css";

interface EventsSearchFormProps {
  onSearch: (year: string | undefined, month: string | undefined) => void;
}

function EventsSearchForm({ onSearch }: EventsSearchFormProps) {
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = function (event: SyntheticEvent) {
    event.preventDefault();

    /// handle errors approprietly

    /// Get events value
    const submittedYear = yearInputRef.current?.value;
    const submittedMonth = monthInputRef.current?.value;

    onSearch(submittedYear, submittedMonth);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.controls}>
        <section className={styles.control}>
          <label htmlFor='year'>Year</label>
          <select id='year' ref={yearInputRef}>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
          </select>
        </section>

        <section className={styles.control}>
          <label htmlFor='month'>Month</label>
          <select id='month' ref={monthInputRef}>
            <option value='1'>January</option>
            <option value='2'>February</option>
            <option value='3'>March</option>
            <option value='4'>April</option>
            <option value='5'>May</option>
            <option value='6'>June</option>
            <option value='7'>July</option>
            <option value='8'>August</option>
            <option value='9'>September</option>
            <option value='10'>Octoberry</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
        </section>
      </div>

      <Button type={ButtonAttributes.SUBMIT}>Find Event</Button>
    </form>
  );
}

export default EventsSearchForm;
