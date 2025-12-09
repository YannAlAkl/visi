// données partagées : utilisateurs et activités (>=5)
const users = [
  { id:1, username:'alice', nom:'Alice Lawrence', email:'alice@ex.com', password:'pass1', role:'Member', abonnement:'Premium', isLogged:false },
  { id:2, username:'bob', nom:'Bob Reynolds', email:'bob@ex.com', password:'pass2', role:'Coach', abonnement:'Coach', isLogged:false },
  { id:3, username:'caro', nom:'Caroline Parker', email:'caro@ex.com', password:'pass3', role:'Member', abonnement:'Standard', isLogged:false }
];

// Classe requise par le TP
class Activity {
  constructor(id, title, type, duration, level, urgent=false, desc='', steps=[]){
    this.id = id;
    this.title = title;
    this.type = type;
    this.duration = duration; // minutes
    this.level = level;
    this.urgent = urgent;
    this.desc = desc;
    this.steps = steps;
  }
}

// tableau initial avec au moins 5 objets
let activities = [
  new Activity(1,'Cardio matinal','Cardio',30,'Débutant',false,'Course légère et échauffement',['Échauffement 10min','Course 20min']),
  new Activity(2,'Muscu jambes','Force',50,'Intermédiaire',true,'Squat, fentes, travail de force',['Squat 4x8','Fentes 3x12']),
  new Activity(3,'HIIT express','Cardio',20,'Avancé',true,'Intervalles intenses 40/20',['Échauffement 5min','4 rounds 40/20']),
  new Activity(4,'Yoga mobilité','Mixte',45,'Tous',false,'Étirements et mobilité douce',['Respiration','Étirements dynamiques']),
  new Activity(5,'Full Body training','Force',40,'Intermédiaire',false,'Circuit multi-articulaire',['Développé','Row','Deadlift']),
  new Activity(6,'Core & Stability','Mixte',25,'Débutant',false,'Renforcement du tronc',['Plank','Deadbug','Side plank'])
];

function nextActivityId(){
  return activities.length ? Math.max(...activities.map(a=>a.id))+1 : 1;
}
