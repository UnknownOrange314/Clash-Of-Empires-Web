

class Artillery:

class MachineGun:

class Intantry:

class Army:
	def __init__(self,a,m,i):
		self.artillery=list()
		for x in range(0,a):
			self.artillery.append(Artillery())
		
		self.machineGuns=list()
		for x in range(0,m):
			self.machineGuns.append(MachineGun())
		
		self.infantry=list()
		for x in range(0,i):
			self.infantry.append(Infantry)
		
	def count(self):
		return len(self.artillery)+len(self.machineGun)+len(self.infantry)

	def infantry(self):
		return self.infantry
	
	def machineGun(self):
		return self.machineGun

	def artillery(self):
		return self.artillery
	
	def isDead(self):
		return self.count()>0

	
	def loss(self,a,b,c):
		self.artillery-=a
		self.machineGun-=b
		self.infantry-=c

	
	def fight(self,other):
		oppA=other.artillery()
		oppM=other.machineGun()
		oppI=other.infantry


		#Artillery attacks

		arrMG=min(len(self.artillery),oppM) #Number of artillery attacking machineGuns
		arrInf=len(self.artillery)-arrMG #Number of artillery attacking infantry

		
		#Machine gun attacks

		mgInf=min(len(self.machineGun),oppI) #Number of machine guns attacking infantry
		mgMG= min(len(self.machineGun)-mgInf,oppMG) #Machine guns attacking MG
		mgArt=0
		if(oppM==0&&oppI==0):
			mgArt=min(len(self.machineGun),oppArt) #Number attacking artillery

		
		infInf=0
		infMG=0
		infArt=0
		#Infantry attack
		if oppI!=0:
			infInf=min(len(self.infantry),oppI) #Number of infantry vs infantry
		elif oppI=0&oppM!=0
			infMG= min(len(self.infantry),oppMG) #Infantry attacking MG
		else:
			infArt=min(len(self.self-mgInf-mgMG,oppArt) #Number attacking infantry


		#Give machine gun vs infantry bonus
		#Artillery shoud pin


a1=Army(10,30,10)
a2=Army(20,10,20)

print a1.isDead()
print a2.isDead()


