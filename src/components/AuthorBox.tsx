import React from 'react';
import styles from './AuthorBox.module.css';

interface AuthorBoxProps {
    name?: string;
    title?: string;
    bio?: string;
}

const AuthorBox: React.FC<AuthorBoxProps> = ({
    name = "AIBrainX Editorial Team",
    title = "Senior AI Reviewer & SaaS Specialist",
    bio = "Our editorial team consists of Indian AI architects and software engineers with deep expertise in large language models, automation tools, and the Indian SaaS ecosystem. We test every tool for regional usability, local pricing value, and performance."
}) => {
    return (
        <div className={styles.authorBox}>
            <div className={styles.avatar}>
                {name === "AIBrainX Editorial Team" ? "AX" : name.charAt(0)}
            </div>
            <div className={styles.content}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.title}>{title}</p>
                <p className={styles.bio}>{bio}</p>
            </div>
        </div>
    );
};

export default AuthorBox;
