import styles from './ServiceCard.module.css';

export default function ServiceCard({ service }) {
  return (
    <div className={styles.card}>
      <div>
        <div className={styles.iconWrapper}>
          <span className={`material-symbols-outlined ${styles.icon}`}>
            {service.icon}
          </span>
        </div>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.tagline}>{service.tagline}</p>
        <p className={styles.description}>{service.description}</p>
      </div>

      {service.deliverables && (
        <ul className={styles.deliverables}>
          {service.deliverables.map((item, index) => (
            <li key={index} className={styles.deliverableItem}>
              <span className={styles.bullet} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
